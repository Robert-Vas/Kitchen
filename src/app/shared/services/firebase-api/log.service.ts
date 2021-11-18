import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BarModel, ConfigModel, FavoriteModel, LogModel, UserModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {groupBy, map, mergeMap, switchMap, takeLast, toArray} from 'rxjs/operators';
import {combineLatest, from, Observable, of} from 'rxjs';
import {uniq} from 'lodash';
import {NzModalService} from 'ng-zorro-antd';

@Injectable({providedIn: 'root'})
export class LogService extends BaseService<LogModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public modalService: NzModalService) {
    super(db, myErr, 'logs', modalService);
  }

  addLog(item: LogModel) {
    return this.baseCollection.add(JSON.parse(JSON.stringify(item)));
  }

  // getLogList() {
  //   return this.db.collection<LogModel>('logs').valueChanges()
  //     .pipe(switchMap(f => {
  //       const userIds = uniq(f.map(o => o.userId));
  //       if (f.length > 0) {
  //         return combineLatest(
  //           of(f),
  //           combineLatest(
  //             userIds.map(userId =>
  //               this.db.doc<UserModel>(`/users/${userId}`)
  //                 .valueChanges().pipe(map(user => user))
  //             )));
  //       } else {
  //         return of(f, []);
  //       }
  //     }), map(([logs, users]) => {
  //       return logs.map(l => {
  //         const user = users.filter(u => u !== undefined).find(u => u.uid === l.userId);
  //         return {
  //           ...l,
  //           userName: user ? user.displayName : 'anonymous',
  //           email: user ? user.email : 'anonymous@gmail.com'
  //         };
  //       });
  //     }));
  // }

  getLogList1() {
    return combineLatest([this.db.collection<LogModel>('logs').snapshotChanges(),
      this.db.collection<UserModel>('users').snapshotChanges()])
      .pipe(
        map(results => {
          const logList = results[0].map((action) => {
            const data = action.payload.doc.data();
            return ({id: action.payload.doc.id, ...data}) as LogModel;
          });
          const userList = results[1].map((action) => {
            const data = action.payload.doc.data();
            return ({id: action.payload.doc.id, ...data}) as UserModel;
          });

          return logList.map(log => {
            const user = userList.find(u => u.uid === log.userId);
            return {
              ...log,
              userName: user ? user.displayName : 'anonymous',
              email: user ? user.email : 'anonymous@gmail.com'
            };
          });
        }));
  }

  getPieList(): Observable<Array<BarModel>> {
    return this.db.collection<LogModel>('logs').valueChanges().pipe(
      switchMap(logs => {
          return from(logs).pipe(
            groupBy(g => g.device),
            mergeMap(group => group.pipe(toArray())),
            map(arr => {
                return new BarModel({
                  name: arr[0].device,
                  value: arr.length
                });
              }
            ),
            toArray()
          );
        }
      )
    );
  }


  getVisitList(count = 15): Observable<Array<BarModel>> {
    return this.db.collection<LogModel>('logs',
      model => model.orderBy('date', 'asc')).valueChanges().pipe(
      switchMap(logs => {
          return from(logs).pipe(
            groupBy(g => g.date.substring(0, 10)),
            mergeMap(group => group.pipe(toArray())),
            map(arr => {
                return new BarModel({
                  name: arr[0].date.substring(0, 10),
                  value: arr.length
                });
              }
            ),
            toArray(),
            takeLast(count)
          );
        }
      )
    );
  }
}

