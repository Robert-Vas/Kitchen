import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {ModalService} from '../modal.service';

@Injectable({providedIn: 'root'})
export class MyError {
  quotaErrMsg = 'Too many requests,Firebase Request Quota exceeded,Please try again after 12 hours';

  constructor(private modalService: ModalService) {
  }

  public handleError<T>(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    if (error === 'Quota exceeded.') {
      this.modalService.error(this.quotaErrMsg);
    }
    this.modalService.error(error);

    return throwError(errMsg);
  }
}
