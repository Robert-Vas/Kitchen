import {Component, OnInit} from '@angular/core';
import {NutritionFieldsModel, NutritionFieldsService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {NutritionFieldsAddComponent} from './nutrition_fields-add/nutrition_fields-add.component';


@Component({
  selector: 'app-cate',
  templateUrl: './nutrition_fields.component.html',
  styleUrls: ['./nutrition_fields.component.scss']
})
export class NutritionFieldsComponent implements OnInit {
  allList: Array<NutritionFieldsModel> = [];
  list: Array<NutritionFieldsModel>;

  constructor(private nutrition_fieldsService: NutritionFieldsService,
              private modalService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.nutrition_fieldsService.getList().subscribe(r => {
      this.allList = r;
      this.list = this.allList;
      this.list = this.list.sort((a, b) => a.sort - b.sort);
    });
  }

  deleteRow(id: string): void {
    this.list = this.list.filter(d => d.id !== id);
    this.nutrition_fieldsService.delete(id).then(() => {
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

  createComponentModal(isEdit: boolean, data: NutritionFieldsModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Nutrition Field' : 'Add Nutrition Field',
      nzContent: NutritionFieldsAddComponent,
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
