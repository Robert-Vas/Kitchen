import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {PayModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {NzModalService} from 'ng-zorro-antd';

@Injectable({providedIn: 'root'})
export class PayService extends BaseService<PayModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public modalService: NzModalService) {
    super(db, myErr, 'pays', modalService);
  }
}

