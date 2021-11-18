import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IngredientsModel, IngredientsService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-ingredients-add',
  templateUrl: './ingredients-add.component.html',
  styleUrls: ['./ingredients-add.component.scss']
})
export class IngredientsAddComponent implements OnInit {
  ingredientsForm: FormGroup;
  ingredientList: Array<string> = [];
  filteredOptions: Array<string> = [];
  nzFilterOption = () => true;
  @Input() isEdit;
  @Input() data: IngredientsModel;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private ingredientsService: IngredientsService) {
    this.ingredientsForm = this.fb.group({
      name_en: ['', [Validators.required, Validators.minLength(3)]],
      name_sp: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.ingredientsForm.get('name_en').setValue(this.data.name_en);
      this.ingredientsForm.get('name_sp').setValue(this.data.name_sp);
    }

    this.ingredientsService.getList().subscribe(r => {
      r.forEach(i => {
        this.ingredientList.push(i.name_en);
      })
    });

  }

  onChange(value: string): void {
    this.filteredOptions = this.ingredientList.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new IngredientsModel();
    model.name_en = this.ingredientsForm.controls.name_en.value;
    model.name_sp = this.ingredientsForm.controls.name_sp.value;
    if (this.isEdit) {
      model.id = this.data.id;
      this.ingredientsService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.ingredientsService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }

}

