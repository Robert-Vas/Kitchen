import {Component, OnInit} from '@angular/core';
import {LocationsModel, LocationsService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {LocationsAddComponent} from './locations-add/locations-add.component';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  allList: Array<LocationsModel> = [];
  list: Array<LocationsModel>;

  constructor(private locationsService: LocationsService,
              private modalService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.locationsService.getList().subscribe(r => {
      this.allList = r;
      this.list = this.allList;
     // this.list = this.list.sort((a, b) => a.sort - b.sort);
    });
  }

  deleteRow(id: string): void {
    this.list = this.list.filter(d => d.id !== id);
    this.locationsService.delete(id).then(() => {
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

  createComponentModal(isEdit: boolean, data: LocationsModel = null): void {
    const modal = this.modalService.create({
      nzTitle: isEdit ? 'Edit Location' : 'Add Location',
      nzContent: LocationsAddComponent,
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
