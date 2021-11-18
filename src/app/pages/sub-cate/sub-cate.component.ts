import {Component, OnInit} from '@angular/core';
import {SubCateModel, SubCateService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {SubCateAddComponent} from './sub-cate-add/sub-cate-add.component';

@Component({
  selector: 'app-sub-cate',
  templateUrl: './sub-cate.component.html',
  styleUrls: ['./sub-cate.component.scss']
})
export class SubCateComponent implements OnInit {
  searchValue = '';
  sortName = '';
  sortValue = '';
  list: Array<SubCateModel> = [];
  listOfDisplayData: Array<SubCateModel>;

  constructor(private subCateService: SubCateService,
              private modalService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.subCateService.getList().subscribe(r => {
      this.list = r;
      this.listOfDisplayData = this.list;
      this.listOfDisplayData = this.listOfDisplayData.sort((a, b) => a.sort - b.sort);
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }


  search(): void {
    const data = this.list.filter(d => d.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
    this.listOfDisplayData = data.sort((a, b) => {
        return this.sortValue === 'ascend'
          // tslint:disable-next-line:no-non-null-assertion
          ? a[this.sortName!] <= b[this.sortName!] ? -1 : 1
          // tslint:disable-next-line:no-non-null-assertion
          : b[this.sortName!] > a[this.sortName!]
            ? 1
            : -1;
      }
    );
  }

  deleteRow(id: string): void {
    this.listOfDisplayData = this.listOfDisplayData.filter(d => d.id !== id);
    this.subCateService.delete(id).then(() => {
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

  createComponentModal(isEdit: boolean, data: SubCateModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Sub-Cate' : 'Add Sub-Cate',
      nzContent: SubCateAddComponent,
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
