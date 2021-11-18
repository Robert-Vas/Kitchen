import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BarModel, LineModel, UserModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {from, Observable} from 'rxjs';
import {groupBy, map, mergeMap, reduce, switchMap, takeLast, toArray} from 'rxjs/operators';
import {NzModalService} from 'ng-zorro-antd';

@Injectable({providedIn: 'root'})
export class UsersService extends BaseService<UserModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public modalService: NzModalService) {
    super(db, myErr, 'users', modalService);
  }

  getLineList(): Observable<Array<LineModel>> {
    return this.db.collection<UserModel>('users',
      model => model.orderBy('registerDate', 'asc')).valueChanges().pipe(
      switchMap(users => {
          return from(users).pipe(
            groupBy(u => u.registerDate.substring(0, 10)),
            mergeMap(group => group.pipe(toArray())),
            map(arr => {
                return new BarModel({
                  name: arr[0].registerDate.substring(0, 10),
                  value: arr.length
                });
              }
            ),
            reduce<BarModel, LineModel>((previous, bar) => {
              return {
                name: 'Users Num',
                series: [
                  ...previous.series,
                  bar
                ]
              };
            }, {name: 'Users Num', series: []}),
            takeLast(5),
            toArray()
          );
        }
      )
    );
  }
}
