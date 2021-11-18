import {Component, OnInit} from '@angular/core';
import {MealsModel, MealsService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {MealsAddComponent} from './meals-add/meals-add.component';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {
  allList: Array<MealsModel> = [];
  list: Array<MealsModel>;

  constructor(private mealsService: MealsService,
              private modalService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.mealsService.getList().subscribe(r => {
      this.allList = r;
      this.list = this.allList;
      // this.list = this.list.sort((a, b) => a.sort - b.sort);
    });
  }

  deleteRow(id: string): void {
    this.list = this.list.filter(d => d.id !== id);
    this.mealsService.delete(id).then(() => {
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

  createComponentModal(isEdit: boolean, data: MealsModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Meal' : 'Add Meal',
      nzContent: MealsAddComponent,
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
