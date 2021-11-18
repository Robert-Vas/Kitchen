import {Injectable} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';


@Injectable({providedIn: 'root'})
export class ModalService {
  constructor(private modalService: NzModalService) {
  }

  info(msg: string): void {
    this.modalService.info({
      nzTitle: 'Info',
      nzContent: msg
    });
  }

  success(msg): void {
    this.modalService.success({
      nzTitle: 'Info',
      nzContent: msg
    });
  }

  error(msg): void {
    this.modalService.error({
      nzTitle: 'Info',
      nzContent: msg
    });
  }

  warning(msg): void {
    this.modalService.warning({
      nzTitle: 'Info',
      nzContent: msg
    });
  }

  confirm(msg: string) {
    const modal = this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: msg,
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnCancel: () => modal.close(false),
      nzOnOk: () => modal.close(true)
    });
    return modal;
  }
}
