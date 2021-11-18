import {Component, OnInit} from '@angular/core';
import {CouponModel, CouponsService, ModalService} from '../../shared';
import {CouponAddComponent} from './coupon-add/coupon-add.component';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  sortName = '';
  sortValue = '';
  searchValue = '';
  allList: Array<CouponModel> = [];
  list: Array<CouponModel>;

  constructor(private couponService: CouponsService,
              private modalService: ModalService,
              private mService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.couponService.getList().subscribe(r => {
      this.allList = r;
      this.list = this.allList;
      this.list = this.list.sort((a, b) => a.sort - b.sort);
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
    const data = this.allList.filter(d => d.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
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
    this.list = this.list.filter(d => d.id !== id);
    this.couponService.delete(id).then(() => {
      this.modalService.success('delete success!');
    });
  }

  editRow(data) {
    this.createComponentModal(true, data);
  }

  add() {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data: CouponModel = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Edit Coupon' : 'Add Coupon',
      nzContent: CouponAddComponent,
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
