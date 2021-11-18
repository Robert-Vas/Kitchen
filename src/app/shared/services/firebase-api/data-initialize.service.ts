import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MyError} from './my-error';

@Injectable({providedIn: 'root'})
export class DataInitializeService {
  constructor(public db: AngularFirestore,
              public myErr: MyError) {
  }
}

