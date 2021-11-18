import {Component, OnInit} from '@angular/core';
import {DeliveryModel, DeliveryService, ModalService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {DeliveryAddComponent} from './delivery-add/delivery-add.component';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  list: Array<DeliveryModel>;
  isLoading = false;

  constructor(private dService: DeliveryService,
              private mService: NzModalService,
              private modalService: ModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.dService.getList().subscribe(r => {
      this.list = r;
      this.list = this.list.sort((a, b) => a.sort - b.sort);
    });
  }

  deleteRow(id: string): void {
    this.isLoading = true;
    this.list = this.list.filter(d => d.id !== id);
    this.dService.delete(id).then(() => {
      this.isLoading = false;
      this.modalService.success('delete success!');
    });
  }

  editRow(data) {
    this.createComponentModal(true, data);
  }

  add() {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data: DeliveryModel = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Edit Express' : 'Add Express',
      nzContent: DeliveryAddComponent,
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
