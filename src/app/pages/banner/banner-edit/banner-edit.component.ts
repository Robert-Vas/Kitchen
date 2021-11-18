import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BannerModel, BannerService} from '../../../shared';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.scss']
})
export class BannerEditComponent implements OnInit {
  bForm: FormGroup;
  @Input() isEdit;
  @Input() data: BannerModel;
  isLoading = false;
  imgUrl = null;


  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private bannerService: BannerService) {
    this.bForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.bForm.get('name').setValue(this.data.name);
      this.imgUrl = this.data.img;
    }
  }

  down(event) {
    this.imgUrl = event;
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new BannerModel();
    model.name = this.bForm.controls.name.value;
    model.img = this.imgUrl;
    model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (this.isEdit) {
      model.id = this.data.id;
      this.bannerService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.bannerService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }


}
