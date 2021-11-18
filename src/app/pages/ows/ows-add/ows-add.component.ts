import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OwsModel, OwsService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-ows-add',
  templateUrl: './ows-add.component.html',
  styleUrls: ['./ows-add.component.scss']
})
export class OwsAddComponent implements OnInit {
  oForm: FormGroup;
  @Input() isEdit;
  @Input() data: OwsModel;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private owsService: OwsService) {
    this.oForm = this.fb.group({
      minWeight: [1, [Validators.required]],
      maxWeight: [100, [Validators.required]],
      sort: [1, [Validators.required]],
      cost: [1, [Validators.required]],
      isEnable: [true]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.oForm.get('minWeight').setValue(this.data.minWeight);
      this.oForm.get('maxWeight').setValue(this.data.maxWeight);
      this.oForm.get('sort').setValue(this.data.sort);
      this.oForm.get('cost').setValue(this.data.cost);
      this.oForm.get('isEnable').setValue(this.data.isEnable);
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new OwsModel();
    model.minWeight = +this.oForm.controls.minWeight.value;
    model.maxWeight = +this.oForm.controls.maxWeight.value;
    model.sort = +this.oForm.controls.sort.value;
    model.cost = +this.oForm.controls.cost.value;
    model.isEnable = this.oForm.controls.isEnable.value;
    model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (this.isEdit) {
      model.id = this.data.id;
      this.owsService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.owsService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }

}
