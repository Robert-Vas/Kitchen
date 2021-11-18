import {Component, OnInit} from '@angular/core';
import {ModalService, PayModel, PayService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {PaysAddComponent} from './pays-add/pays-add.component';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss']
})
export class PaysComponent implements OnInit {
  searchValue = '';
  allList: Array<PayModel> = [];
  list: Array<PayModel>;

  constructor(private payService: PayService,
              private modalService: NzModalService,
              private mService: ModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.payService.getList().subscribe(r => {
      this.allList = r;
      this.list = this.allList.sort((a, b) => a.sort - b.sort);
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }


  search(): void {
    this.list = this.allList.filter(d => d.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
  }

  deleteRow(id: string): void {
    this.list = this.list.filter(d => d.id !== id);
    this.payService.delete(id).then(() => {
      this.mService.success('delete success');
    });
  }

  editRow(data) {
    this.createComponentModal(true, data);
  }

  add() {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data: PayModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Pay' : 'Add Pay',
      nzContent: PaysAddComponent,
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
