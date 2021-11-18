import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CateModel, CateService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-cate-add',
  templateUrl: './cate-add.component.html',
  styleUrls: ['./cate-add.component.scss']
})
export class CateAddComponent implements OnInit {
  cateForm: FormGroup;
  @Input() isEdit;
  @Input() data: CateModel;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private cateService: CateService) {
    this.cateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      sort: [1, [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.cateForm.get('name').setValue(this.data.name);
      this.cateForm.get('sort').setValue(this.data.sort);
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new CateModel();
    model.name = this.cateForm.controls.name.value;
    model.sort = +this.cateForm.controls.sort.value;
    model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
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
