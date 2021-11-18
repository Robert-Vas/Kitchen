import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocationsModel, LocationsService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-locations-add',
  templateUrl: './locations-add.component.html',
  styleUrls: ['./locations-add.component.scss']
})
export class LocationsAddComponent implements OnInit {
  locationsForm: FormGroup;
  @Input() isEdit;
  @Input() data: LocationsModel;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private locationsService: LocationsService) {
    this.locationsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      neighborhood: ['', [ Validators.minLength(1)]],
      zip: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.locationsForm.get('name').setValue(this.data.name);
      this.locationsForm.get('address').setValue(this.data.address);
      this.locationsForm.get('neighborhood').setValue(this.data.neighborhood);
      this.locationsForm.get('zip').setValue(this.data.zip);
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new LocationsModel();
    model.name = this.locationsForm.controls.name.value;
    model.address = this.locationsForm.controls.address.value;
    model.neighborhood = this.locationsForm.controls.neighborhood.value;
    model.zip = this.locationsForm.controls.zip.value;
    if (this.isEdit) {
      model.id = this.data.id;
      this.locationsService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.locationsService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }

}
