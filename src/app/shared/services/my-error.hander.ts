import {ErrorHandler, Injectable} from '@angular/core';
import {ModalService} from './modal.service';


@Injectable({providedIn: 'root'})
export class MyErrorHandler implements ErrorHandler {
  quotaErrMsg = 'Too many requests,Firebase Request Quota exceeded,Please try again after 12 hours';

  constructor(private modalService: ModalService) {
  }

  handleError(error: any): void {
    if (error === 'Quota exceeded.') {
      this.modalService.error(this.quotaErrMsg);
    }
    this.modalService.error(error);
  }

}
