import {Component, OnInit} from '@angular/core';
import {ModalService, OwsModel, OwsService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {OwsAddComponent} from './ows-add/ows-add.component';
import {NoticeAddComponent} from '../notice/notice-add/notice-add.component';

@Component({
  selector: 'app-ows',
  templateUrl: './ows.component.html',
  styleUrls: ['./ows.component.scss']
})
export class OwsComponent implements OnInit {
  list: Array<OwsModel>;
  isLoading = false;

  constructor(private owsService: OwsService,
              private mService: NzModalService,
              private modalService: ModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.owsService.getList().subscribe(r => {
      this.list = r;
      this.list = this.list.sort((a, b) => a.sort - b.sort);
    });
  }

  deleteRow(id: string): void {
    this.isLoading = true;
    this.list = this.list.filter(d => d.id !== id);
    this.owsService.delete(id).then(() => {
      this.isLoading = false;
      this.modalService.success('delete success!');
    });
  }

  editRow(data) {
    this.createComponentModal(true, data);
  }

  add() {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data: OwsModel = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Edit OverWeight Surcharge' : 'Add OverWeight Surcharge',
      nzContent: OwsAddComponent,
      nzComponentParams: {
        isEdit,
        data
      }
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.bindData();
      }
    });
  }

}
