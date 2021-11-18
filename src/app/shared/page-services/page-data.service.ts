import {Injectable} from '@angular/core';
import {BaseService} from '../services/firebase-api/base.service';
import {combineLatest} from 'rxjs';
import {Id} from '../model';
import {ModalService} from '../services/modal.service';

@Injectable({providedIn: 'root'})
export class PageDataService {
  quotaErrMsg = 'Too many requests,Firebase Request Quota exceeded,Please try again at 00:00:00。';

  constructor(private modalService: ModalService) {
  }

  getList(serviceList: Array<any>): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      combineLatest(serviceList).subscribe(results => {
        if (results) {
          resolve(results);
        }
      }, error => {
        if (error === 'Quota exceeded.') {
          this.modalService.error(this.quotaErrMsg);
        }
        this.modalService.error(error);
      });
    });
  }

  getSingleList<T extends Id>(service: BaseService<T>): Promise<Array<T>> {
    return new Promise<Array<T>>(async (resolve, reject) => {
      service.getList().subscribe(result => {
        resolve(result);
      }, error => this.modalService.error(error));
    });
  }

  getModel<T extends Id>(service: BaseService<T>, id: number): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      service.getModel(id).subscribe(result => {
        resolve(result);
      }, error => this.modalService.error(error));
    });
  }
}
