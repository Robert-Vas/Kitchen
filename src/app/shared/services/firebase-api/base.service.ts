import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {MyError} from './my-error';
import {from, Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ConfigModel, Id} from '../../model';
import {NzModalService} from 'ng-zorro-antd';


export class BaseService<T extends Id> {
  public baseCollection: AngularFirestoreCollection<T>;

  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public path: string,
              public modalService?: NzModalService) {
    this.baseCollection = this.db.collection<T>(path);
  }

  error(msg): void {
    this.modalService.error({nzTitle: 'Info', nzContent: msg});
  }

  getList(): Observable<Array<T>> {
    return this.baseCollection.snapshotChanges()
      .pipe(
        map((d) => {
          return d.map((action) => {
            const data = action.payload.doc.data();
            return ({id: action.payload.doc.id, ...data}) as T;
          });
        }),
        catchError(this.myErr.handleError)
      );
  }

  getListByParam(fieldName: string, id: string): Observable<Array<T>> {
    this.baseCollection = this.db.collection<T>(this.path, ref => ref.where(fieldName, '==', id));
    return this.baseCollection.snapshotChanges()
      .pipe(
        map((d) => {
          return d.map((action) => {
            const data = action.payload.doc.data();
            return ({id: action.payload.doc.id, ...data}) as T;
          });
        }),
        catchError(this.myErr.handleError)
      );
  }

  getModel(id: any): Observable<T> {
    return this.db.doc<T>(`/${this.path}/${id}`).snapshotChanges()
      .pipe(
        map(d => ({id: d.payload.id, ...d.payload.data()})),
        catchError(this.myErr.handleError)
      );
  }

  addModel(item: T) {
    if (ConfigModel.isTest) {
      this.error(ConfigModel.testInfo);
    } else {
      return this.baseCollection.add(JSON.parse(JSON.stringify(item)));
    }
  }

  addAndUpdate(item: T) {
    if (ConfigModel.isTest) {
      this.error(ConfigModel.testInfo);
    } else {
      return from(this.baseCollection.add(JSON.parse(JSON.stringify(item)))).pipe(
        switchMap(r => {
          item.id = r.id;
          return [this.db.doc(`/${this.path}/${r.id}`).update(JSON.parse(JSON.stringify(item)))];
        })
      );
    }
  }

  addList(list: Array<T>) {
    const resultList = new Array();
    list.map(item => resultList.push(this.baseCollection.add(JSON.parse(JSON.stringify(item)))));
    return resultList;
  }


  create(c: new(s) => T, id: string): T {
    return new c(id);
  }

  update(item: T): Promise<void> {
    if (ConfigModel.isTest) {
      this.error(ConfigModel.testInfo);
    } else {
      return this.db.doc(`/${this.path}/${item.id}`).update(JSON.parse(JSON.stringify(item)));
    }
  }

  delete(id: string): Promise<void> {
    if (ConfigModel.isTest) {
      this.error(ConfigModel.testInfo);
      return new Promise<void>((resolve) => resolve());
    } else {
      return this.db.doc(`/${this.path}/${id}`).delete();
    }
  }
}
