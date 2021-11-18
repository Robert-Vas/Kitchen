import {Component, OnInit} from '@angular/core';
import {CategoriesModel, CategoriesService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {CategoriesAddComponent} from './categories-add/categories-add.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  allList: Array<CategoriesModel> = [];
  list: Array<CategoriesModel>;

  constructor(private cateService: CategoriesService,
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

  createComponentModal(isEdit: boolean, data: CategoriesModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Category' : 'Add Cateegory',
      nzContent: CategoriesAddComponent,
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
