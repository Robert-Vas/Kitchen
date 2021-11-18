import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DishTypesModel, DishTypesService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dish-types-add',
  templateUrl: './dish_types-add.component.html',
  styleUrls: ['./dish_types-add.component.scss']
})
export class DishTypesAddComponent implements OnInit {
  dish_typesForm: FormGroup;
  @Input() isEdit;
  @Input() data: DishTypesModel;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private dish_typesService: DishTypesService) {
    this.dish_typesForm = this.fb.group({
      name_en: ['', [Validators.required, Validators.minLength(3)]],
      name_sp: ['', [Validators.minLength(3)]],
      sort: [1, [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.dish_typesForm.get('name_en').setValue(this.data.name_en);
      this.dish_typesForm.get('name_sp').setValue(this.data.name_sp);
      this.dish_typesForm.get('sort').setValue(this.data.sort);
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new DishTypesModel();
    model.name_en = this.dish_typesForm.controls.name_en.value;
    model.name_sp = this.dish_typesForm.controls.name_sp.value;
    model.sort = +this.dish_typesForm.controls.sort.value;
    if (this.isEdit) {
      model.id = this.data.id;
      this.dish_typesService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.dish_typesService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }

}
