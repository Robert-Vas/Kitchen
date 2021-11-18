import {Component, OnInit} from '@angular/core';
import {NoticeModel, NoticeService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {NoticeAddComponent} from './notice-add/notice-add.component';


@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {
  searchValue = '';
  allList: Array<NoticeModel> = [];
  list: Array<NoticeModel>;

  constructor(private noticeService: NoticeService,
              private modalService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.noticeService.getList().subscribe(r => {
      this.allList = r;
      this.list = this.allList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }


  search(): void {
    this.list = this.allList.filter(d => d.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
  }

  deleteRow(id: string): void {
    this.list = this.list.filter(d => d.id !== id);
    this.noticeService.delete(id).then(() => {
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

  createComponentModal(isEdit: boolean, data: NoticeModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Notice' : 'Add Notice',
      nzContent: NoticeAddComponent,
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
