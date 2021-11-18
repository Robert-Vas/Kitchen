import {Component, OnInit} from '@angular/core';
import {DishTypesModel, DishTypesService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {DishTypesAddComponent} from './dish_types-add/dish_types-add.component';


@Component({
  selector: 'app-dish-types',
  templateUrl: './dish_types.component.html',
  styleUrls: ['./dish_types.component.scss']
})
export class DishTypesComponent implements OnInit {
  allList: Array<DishTypesModel> = [];
  list: Array<DishTypesModel>;

  constructor(private dish_typesService: DishTypesService,
              private modalService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.dish_typesService.getList().subscribe(r => {
      this.allList = r;
      this.list = this.allList;
      this.list = this.list.sort((a, b) => a.sort - b.sort);
    });
  }

  deleteRow(id: string): void {
    this.list = this.list.filter(d => d.id !== id);
    this.dish_typesService.delete(id).then(() => {
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

  createComponentModal(isEdit: boolean, data: DishTypesModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Dish Type' : 'Add Dish Type',
      nzContent: DishTypesAddComponent,
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
