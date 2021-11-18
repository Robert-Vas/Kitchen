import {Component, OnInit} from '@angular/core';
import {AllergensModel, AllergensService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {AllergensAddComponent} from './allergens-add/allergens-add.component';


@Component({
  selector: 'app-categories',
  templateUrl: './allergens.component.html',
  styleUrls: ['./allergens.component.scss']
})
export class AllergensComponent implements OnInit {
  allList: Array<AllergensModel> = [];
  list: Array<AllergensModel>;

  constructor(private allergensService: AllergensService,
              private modalService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.allergensService.getList().subscribe(r => {
      this.allList = r;
      this.list = this.allList;
    });
  }

  deleteRow(id: string): void {
    this.list = this.list.filter(d => d.id !== id);
    this.allergensService.delete(id).then(() => {
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

  createComponentModal(isEdit: boolean, data: AllergensModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Category' : 'Add Cateegory',
      nzContent: AllergensAddComponent,
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
