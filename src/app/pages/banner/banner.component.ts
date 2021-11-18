import {Component, OnInit} from '@angular/core';
import {BannerModel, BannerService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {BannerEditComponent} from './banner-edit/banner-edit.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  searchValue = '';
  sortName = '';
  sortValue = '';
  list: Array<BannerModel> = [];
  listOfDisplayData: Array<BannerModel>;
  isLoading = false;

  constructor(private bannerService: BannerService,
              private modalService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.bannerService.getList().subscribe(r => {
      this.list = r;
      this.listOfDisplayData = this.list;
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
    this.isLoading = true;
    this.listOfDisplayData = this.listOfDisplayData.filter(d => d.id !== id);
    this.bannerService.delete(id).then(() => {
      this.isLoading = false;
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

  createComponentModal(isEdit: boolean, data: BannerModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Banner' : 'Add Banner',
      nzContent: BannerEditComponent,
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
