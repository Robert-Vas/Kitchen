import {Component, OnInit} from '@angular/core';
import {DishesModel, DishesService, ModalService, PageDataService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {DishesAddComponent} from './dishes-add/dishes-add.component';
import {DishesReviewsComponent} from './dishes-reviews/dishes-reviews.component';
import {DishesPhotoComponent} from './dishes-photo/dishes-photo.component';
import {DishesPreviewComponent} from './dishes-preview/dishes-preview.component';
import { DishesVideoComponent } from './dishes-video/dishes-video.component';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
  sortName = '';
  sortValue = '';
  searchValue = '';
  allList: Array<DishesModel> = [];
  list: Array<DishesModel>;
  isLoading = false;

  constructor(private dishesService: DishesService,
              private pageService: PageDataService,
              private modalService: ModalService,
              private mService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.dishesService.getList().subscribe(result => {
      this.allList = result;
      this.list = result;
      // this.list = this.allList.sort((a, b) => b.sort - a.sort);
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
    const data = this.allList.filter(d => d.name_en.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
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
    this.dishesService.delete(id).then(() => {
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

  createComponentModal(isEdit: boolean, data: DishesModel = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Edit Dish' : 'Add Dish',
      nzContent: DishesAddComponent,
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
      nzTitle: 'Dish Reviews',
      nzContent: DishesReviewsComponent,
      nzComponentParams: {
        id,
      },
      nzWidth: '700px'
    });
  }

  onPhoto(id: string) {
    this.mService.create({
      nzTitle: 'Dish Photos',
      nzContent: DishesPhotoComponent,
      nzComponentParams: {
        id,
      },
      nzWidth: '700px'
    });
  }

  onVideo(id: string) {
    this.mService.create({
      nzTitle: 'Dish Video',
      nzContent: DishesVideoComponent,
      nzComponentParams: {
        id,
      },
      nzWidth: '700px'
    }); 
  }

  onView(url: string) {
    this.mService.create({
      nzContent: DishesPreviewComponent,
      nzComponentParams: {
        url,
      },
      nzWidth: '470px', nzFooter: null
    });
  }
}
