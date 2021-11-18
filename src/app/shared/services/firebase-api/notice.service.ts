import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NoticeModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {NzModalService} from 'ng-zorro-antd';

@Injectable({providedIn: 'root'})
export class NoticeService extends BaseService<NoticeModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              modalService: NzModalService) {
    super(db, myErr, 'notice', modalService);
  }
}

