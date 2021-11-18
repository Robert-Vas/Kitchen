import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {DishesPhotoModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {NzModalService} from 'ng-zorro-antd';

@Injectable({providedIn: 'root'})
export class DishesPhotoService extends BaseService<DishesPhotoModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public modalService: NzModalService) {
    super(db, myErr, 'dishesPhotos', modalService);
  }
}

