import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NutritionFieldsModel, NutritionFieldsService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-nutrition-fields-add',
  templateUrl: './nutrition_fields-add.component.html',
  styleUrls: ['./nutrition_fields-add.component.scss']
})
export class NutritionFieldsAddComponent implements OnInit {
  nutrition_fieldsForm: FormGroup;
  @Input() isEdit;
  @Input() data: NutritionFieldsModel;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private nutrition_fieldsService: NutritionFieldsService) {
    this.nutrition_fieldsForm = this.fb.group({
      name_en: ['', [Validators.required, Validators.minLength(1)]],
      name_sp: ['', [Validators.minLength(1)]],
      measurement_type: ['', [Validators.minLength(1)]],
      measurement_display: ['', [Validators.minLength(1)]],
      sort: [1, [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.nutrition_fieldsForm.get('name_en').setValue(this.data.name_en);
      this.nutrition_fieldsForm.get('name_sp').setValue(this.data.name_sp);
      this.nutrition_fieldsForm.get('measurement_display').setValue(this.data.measurement_display);
      this.nutrition_fieldsForm.get('measurement_type').setValue(this.data.measurement_type);
      this.nutrition_fieldsForm.get('sort').setValue(this.data.sort);
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new NutritionFieldsModel();
    model.name_en = this.nutrition_fieldsForm.controls.name_en.value;
    model.name_sp = this.nutrition_fieldsForm.controls.name_sp.value;
    model.measurement_display = this.nutrition_fieldsForm.controls.measurement_display.value;
    model.measurement_type = this.nutrition_fieldsForm.controls.measurement_type.value;
    model.sort = +this.nutrition_fieldsForm.controls.sort.value;

    if (this.isEdit) {
      model.id = this.data.id;
      this.nutrition_fieldsService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.nutrition_fieldsService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }

}
