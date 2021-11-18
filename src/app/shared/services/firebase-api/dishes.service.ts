import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {DishesModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {map, switchMap} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';
import {uniq} from 'lodash';
import {NzModalService} from 'ng-zorro-antd';

@Injectable({providedIn: 'root'})
export class DishesService extends BaseService<DishesModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public modalService: NzModalService) {
    super(db, myErr, 'dishes', modalService);
  }


  public getDishesList(): Observable<Array<DishesModel>> {
    return this.db.collection<DishesModel>('dishes').valueChanges()
      .pipe(
      /*
        switchMap(dishes => {
          const subCateIds = uniq(goods.map(o => o.subCateId));
          return combineLatest(
            of(goods),
            combineLatest(
              subCateIds.map(subCateId =>
                this.db.doc<SubCateModel>(`subcate/${subCateId}`).snapshotChanges()
                  .pipe(map(d => new SubCateModel({id: d.payload.id, ...d.payload.data()})))
              )
            )
          );
        }),
        map(([goods, cate]) => {
          return goods.map(good => {
            const name = cate.find(c => c.id === good.subCateId).name;
            return new GoodsModel({cateName: name, ...good});
          });
        })
        */
      );
  }

  getDishName(id) {
    return this.db.collection('dishes').doc(id).get();
  } 
}


