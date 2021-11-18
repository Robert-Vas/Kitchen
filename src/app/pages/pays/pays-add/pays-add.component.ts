import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PayModel, PayService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-pays-add',
  templateUrl: './pays-add.component.html',
  styleUrls: ['./pays-add.component.scss']
})
export class PaysAddComponent implements OnInit {
  payForm: FormGroup;
  @Input() isEdit;
  @Input() data: PayModel;
  isLoading = false;
  imgUrl = '';

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private payService: PayService) {
    this.payForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      sort: [1, [Validators.required]],
      minAmount: [10, [Validators.required]],
      maxAmount: [100, [Validators.required]],
      isEnable: [true]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.payForm.get('name').setValue(this.data.name);
      this.payForm.get('sort').setValue(this.data.sort);
      this.payForm.get('minAmount').setValue(this.data.minAmount);
      this.payForm.get('maxAmount').setValue(this.data.maxAmount);
      this.payForm.get('isEnable').setValue(this.data.isEnable);
      this.imgUrl = this.data.img;
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  down(event) {
    this.imgUrl = event;
  }

  onOk() {
    this.isLoading = true;
    const model = new PayModel();
    model.name = this.payForm.controls.name.value;
    model.sort = +this.payForm.controls.sort.value;
    model.minAmount = +this.payForm.controls.minAmount.value;
    model.maxAmount = +this.payForm.controls.maxAmount.value;
    model.isEnable = this.payForm.controls.isEnable.value;
    model.img = this.imgUrl;
    model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (this.isEdit) {
      model.id = this.data.id;
      this.payService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.payService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }


}
