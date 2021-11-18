import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MealsModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {NzModalService} from 'ng-zorro-antd';


@Injectable({providedIn: 'root'})
export class MealsService extends BaseService<MealsModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public modalService: NzModalService) {
    super(db, myErr, 'meals', modalService);
  }

  getMeals() {
    return this.db.collection('meals').get();
  }

  // editDetail() {
  //   this.db.collection('orderdetail').get().subscribe((detail) => {
  //     var i = 0;
  //     detail.docs.forEach((doc) => {
  //       if (i % 3 == 0) {
  //         this.db.collection('orderdetail').doc(doc.id).update({dishId: "5kxoDD0SFffRFd4AijFq"});
  //       }
  //       else if (i % 2 == 0) {
  //         this.db.collection('orderdetail').doc(doc.id).update({dishId: "agC4kxQUfnXehxmM18IT"});
  //       }
  //       else {
  //         this.db.collection('orderdetail').doc(doc.id).update({dishId: "dx1zWjxfg8TqGMsIn6z6"});
  //       }
  //       i++;
  //     })
  //   })
  // }

}

