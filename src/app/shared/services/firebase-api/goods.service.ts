import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GoodsModel, SubCateModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {map, switchMap} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';
import {uniq} from 'lodash';
import {NzModalService} from 'ng-zorro-antd';

@Injectable({providedIn: 'root'})
export class GoodsService extends BaseService<GoodsModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public modalService: NzModalService) {
    super(db, myErr, 'goods', modalService);
  }


  public getGoodList(): Observable<Array<GoodsModel>> {
    return this.db.collection<GoodsModel>('goods').valueChanges()
      .pipe(
        switchMap(goods => {
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
      );

  }
}


