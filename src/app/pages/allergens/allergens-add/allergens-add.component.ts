import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AllergensModel, AllergensService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-categories-add',
  templateUrl: './allergens-add.component.html',
  styleUrls: ['./allergens-add.component.scss']
})
export class AllergensAddComponent implements OnInit {
  allergensForm: FormGroup;
  @Input() isEdit;
  @Input() data: AllergensModel;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private allergensService: AllergensService) {
    this.allergensForm = this.fb.group({
      name_en: ['', [Validators.required, Validators.minLength(3)]],
      name_sp: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.allergensForm.get('name_en').setValue(this.data.name_en);
      this.allergensForm.get('name_sp').setValue(this.data.name_sp);
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new AllergensModel();
    model.name_en = this.allergensForm.controls.name_en.value;
    model.name_sp = this.allergensForm.controls.name_sp.value;
    if (this.isEdit) {
      model.id = this.data.id;
      this.allergensService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.allergensService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }

}
