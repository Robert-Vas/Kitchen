import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoticeModel, NoticeService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-notice-add',
  templateUrl: './notice-add.component.html',
  styleUrls: ['./notice-add.component.scss']
})
export class NoticeAddComponent implements OnInit {
  nForm: FormGroup;
  @Input() isEdit;
  @Input() data: NoticeModel;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private noticeService: NoticeService) {
    this.nForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.nForm.get('name').setValue(this.data.name);
      this.nForm.get('description').setValue(this.data.description);
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new NoticeModel();
    model.name = this.nForm.controls.name.value;
    model.description = this.nForm.controls.description.value;
    model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (this.isEdit) {
      model.id = this.data.id;
      this.noticeService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.noticeService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }

}
