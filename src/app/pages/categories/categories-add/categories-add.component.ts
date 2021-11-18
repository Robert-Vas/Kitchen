import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesModel, CategoriesService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.scss']
})
export class CategoriesAddComponent implements OnInit {
  categoriesForm: FormGroup;
  @Input() isEdit;
  @Input() data: CategoriesModel;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private cateService: CategoriesService) {
    this.categoriesForm = this.fb.group({
      name_en: ['', [Validators.required, Validators.minLength(3)]],
      name_sp: ['', [Validators.required, Validators.minLength(3)]],
      sort: [1, [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.categoriesForm.get('name_en').setValue(this.data.name_en);
      this.categoriesForm.get('name_sp').setValue(this.data.name_sp);
      this.categoriesForm.get('sort').setValue(this.data.sort);
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new CategoriesModel();
    model.name_en = this.categoriesForm.controls.name_en.value;
    model.name_sp = this.categoriesForm.controls.name_sp.value;
    model.sort = +this.categoriesForm.controls.sort.value;
    if (this.isEdit) {
      model.id = this.data.id;
      this.cateService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.cateService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }

}
