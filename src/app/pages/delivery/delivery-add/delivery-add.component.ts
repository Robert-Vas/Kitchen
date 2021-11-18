import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeliveryModel, DeliveryService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-delivery-add',
  templateUrl: './delivery-add.component.html',
  styleUrls: ['./delivery-add.component.scss']
})
export class DeliveryAddComponent implements OnInit {
  dForm: FormGroup;
  @Input() isEdit;
  @Input() data: DeliveryModel;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private dService: DeliveryService) {
    this.dForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      shortName: ['', [Validators.required, Validators.minLength(2)]],
      sort: [1, [Validators.required]],
      cost: [0, [Validators.required]],
      isEnable: [false],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.dForm.get('name').setValue(this.data.name);
      this.dForm.get('shortName').setValue(this.data.shortName);
      this.dForm.get('sort').setValue(this.data.sort);
      this.dForm.get('cost').setValue(this.data.cost);
      this.dForm.get('isEnable').setValue(this.data.isEnable);
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new DeliveryModel();
    model.name = this.dForm.controls.name.value;
    model.shortName = this.dForm.controls.shortName.value;
    model.sort = +this.dForm.controls.sort.value;
    model.cost = +this.dForm.controls.cost.value;
    model.isEnable = this.dForm.controls.isEnable.value;
    model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (this.isEdit) {
      model.id = this.data.id;
      this.dService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.dService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }
}
