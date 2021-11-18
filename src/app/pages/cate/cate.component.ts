import {Component, OnInit} from '@angular/core';
import {CateModel, CateService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {CateAddComponent} from './cate-add/cate-add.component';


@Component({
  selector: 'app-cate',
  templateUrl: './cate.component.html',
  styleUrls: ['./cate.component.scss']
})
export class CateComponent implements OnInit {
  allList: Array<CateModel> = [];
  list: Array<CateModel>;

  constructor(private cateService: CateService,
              private modalService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.cateService.getList().subscribe(r => {
      this.allList = r;
      this.list = this.allList;
      this.list = this.list.sort((a, b) => a.sort - b.sort);
    });
  }

  deleteRow(id: string): void {
    this.list = this.list.filter(d => d.id !== id);
    this.cateService.delete(id).then(() => {
      this.modalService.success({
        nzTitle: 'info',
        nzContent: 'delete success'
      });
    });
  }

  editRow(data) {
    this.createComponentModal(true, data);
  }

  add() {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data: CateModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Cate' : 'Add Cate',
      nzContent: CateAddComponent,
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
