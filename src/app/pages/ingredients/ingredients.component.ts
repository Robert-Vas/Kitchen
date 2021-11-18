import {Component, OnInit} from '@angular/core';
import {IngredientsModel, IngredientsService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {IngredientsAddComponent} from './ingredients-add/ingredients-add.component';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  allList: Array<IngredientsModel> = [];
  list: Array<IngredientsModel>;

  constructor(private ingredientsService: IngredientsService,
              private modalService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.ingredientsService.getList().subscribe(r => {
      this.allList = r;
      this.list = this.allList;
      // this.list = this.list.sort((a, b) => a.sort - b.sort);
    });
  }

  deleteRow(id: string): void {
    this.list = this.list.filter(d => d.id !== id);
    this.ingredientsService.delete(id).then(() => {
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

  createComponentModal(isEdit: boolean, data: IngredientsModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Ingredient' : 'Add Ingredient',
      nzContent: IngredientsAddComponent,
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
