import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AllergensModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {NzModalService} from 'ng-zorro-antd';


@Injectable({providedIn: 'root'})
export class AllergensService extends BaseService<AllergensModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public modalService: NzModalService) {
    super(db, myErr, 'allergens', modalService);
  }
}

