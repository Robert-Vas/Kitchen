import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FavoriteModel, GoodsModel, UserModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {map, mergeMap} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';
import {uniq} from 'lodash';
import {NzModalService} from 'ng-zorro-antd';

@Injectable({providedIn: 'root'})
export class FavoriteService extends BaseService<FavoriteModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public modalService: NzModalService) {
    super(db, myErr, 'favorite', modalService);
  }

  // getFavoriteList() {
  //   return this.db.collection<FavoriteModel>('favorite').valueChanges()
  //     .pipe(mergeMap(f => {
  //       const goodIds = uniq(f.map(o => o.goodId));
  //       const userIds = uniq(f.map(o => o.userId));
  //       if (f.length > 0) {
  //         return combineLatest(
  //           of([...f]),
  //           combineLatest(goodIds.map(id => {
  //             return this.db.doc<GoodsModel>(`/goods/${id}`)
  //               .snapshotChanges()
  //               .pipe(map(g => ({id: g.payload.id, ...g.payload.data()})));
  //           })),
  //           combineLatest(
  //             userIds.map(userId =>
  //               this.db.doc<UserModel>(`/users/${userId}`)
  //                 .valueChanges().pipe(map(user => user))
  //             )));
  //       } else {
  //         return of(f, [], []);
  //       }
  //
  //
  //     }), map(([favorites, goods, users]) => {
  //       return favorites ? favorites.map(f => {
  //         const good = goods.find(g => g.id === f.goodId);
  //         return {
  //           ...f,
  //           name: good.name,
  //           img: good.img,
  //           userName: users.find(u => u.uid === f.userId).displayName
  //         };
  //       }) : [];
  //     }));
  // }

  getFavoriteList1() {
    return combineLatest([this.db.collection<FavoriteModel>('favorite').snapshotChanges(),
      this.db.collection<GoodsModel>('goods').snapshotChanges(),
      this.db.collection<UserModel>('users').snapshotChanges()
    ]).pipe(
      map(results => {
        const fList = results[0].map((action) => {
          const data = action.payload.doc.data();
          return ({id: action.payload.doc.id, ...data}) as FavoriteModel;
        });
        const gList = results[1].map((action) => {
          const data = action.payload.doc.data();
          return ({id: action.payload.doc.id, ...data}) as GoodsModel;
        });
        const uList = results[2].map((action) => {
          const data = action.payload.doc.data();
          return ({id: action.payload.doc.id, ...data}) as UserModel;
        });

        return fList.map(f => {
          const good = gList.find(g => g.id === f.goodId);
          return {
            ...f,
            name: good.name,
            img: good.img,
            userName: uList.find(u => u.uid === f.userId).displayName
          };
        });
      }));
  }
}

