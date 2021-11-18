import {Component, OnInit} from '@angular/core';
import {GoodsModel, GoodsService, ModalService, PageDataService, SubCateService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {GoodAddComponent} from './good-add/good-add.component';
import {GoodReviewsComponent} from './good-reviews/good-reviews.component';
import {GoodPhotoComponent} from './good-photo/good-photo.component';
import {GoodPreviewComponent} from './good-preview/good-preview.component';


@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.scss']
})
export class GoodComponent implements OnInit {
  sortName = '';
  sortValue = '';
  searchValue = '';
  allList: Array<GoodsModel> = [];
  list: Array<GoodsModel>;
  isLoading = false;

  constructor(private goodService: GoodsService,
              private subCateService: SubCateService,
              private pageService: PageDataService,
              private modalService: ModalService,
              private mService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.goodService.getList().subscribe(result => {
      this.allList = result;
      this.list = this.allList.sort((a, b) => b.sort - a.sort);
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sort: { key: string; value: string }) {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search() {
    const data = this.allList.filter(d => d.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
    this.list = data.sort((a, b) => {
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
    this.list = this.list.filter(d => d.id !== id);
    this.goodService.delete(id).then(() => {
      this.modalService.success('delete success');
      this.isLoading = false;
    });
  }

  editRow(data) {
    this.createComponentModal(true, data);
  }

  add() {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data: GoodsModel = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Edit Meal' : 'Add Meal',
      nzContent: GoodAddComponent,
      nzComponentParams: {
        isEdit,
        data
      },
      nzWidth: '750px'
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.bindData();
      }
    });
  }

  reviewsRow(id: string) {
    this.mService.create({
      nzTitle: 'Good Reviews',
      nzContent: GoodReviewsComponent,
      nzComponentParams: {
        id,
      },
      nzWidth: '700px'
    });
  }

  onPhoto(id: string) {
    this.mService.create({
      nzTitle: 'Good Photos',
      nzContent: GoodPhotoComponent,
      nzComponentParams: {
        id,
      },
      nzWidth: '700px'
    });
  }

  onView(url: string) {
    this.mService.create({
      nzContent: GoodPreviewComponent,
      nzComponentParams: {
        url,
      },
      nzWidth: '470px', nzFooter: null
    });
  }
}
