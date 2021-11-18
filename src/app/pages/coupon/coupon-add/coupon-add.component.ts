import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CouponModel, CouponsService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.scss']
})
export class CouponAddComponent implements OnInit {
  cForm: FormGroup;
  @Input() isEdit;
  @Input() data: CouponModel;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private couponService: CouponsService) {
    this.cForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      sort: [1, [Validators.required]],
      enable: [true, [Validators.required]],
      discountAmount: [0, [Validators.required]],
      amount: [100, [Validators.required]],
      beginDate: [new Date(), [Validators.required]],
      endDate: [new Date(), [Validators.required]],
      desc: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.cForm.get('name').setValue(this.data.name);
      this.cForm.get('desc').setValue(this.data.desc);
      this.cForm.get('sort').setValue(this.data.sort);
      this.cForm.get('amount').setValue(this.data.amount);
      this.cForm.get('enable').setValue(this.data.enable);
      this.cForm.get('discountAmount').setValue(this.data.discountAmount);
      this.cForm.get('beginDate').setValue(this.data.beginDate);
      this.cForm.get('endDate').setValue(this.data.endDate);
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new CouponModel();
    model.name = this.cForm.controls.name.value;
    model.desc = this.cForm.controls.desc.value;
    model.enable = this.cForm.controls.enable.value;
    model.sort = +this.cForm.controls.sort.value;
    model.amount = +this.cForm.controls.amount.value;
    model.discountAmount = +this.cForm.controls.discountAmount.value;
    model.beginDate = this.datePipe.transform(this.cForm.controls.beginDate.value, 'yyyy-MM-dd HH:mm:ss');
    model.endDate = this.datePipe.transform(this.cForm.controls.endDate.value, 'yyyy-MM-dd HH:mm:ss');
    model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (this.isEdit) {
      model.id = this.data.id;
      this.couponService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.couponService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }
}
