import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MealsModel, MealsService, DishesModel, DishesService, LocationsModel, LocationsService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerDayView } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

@Component({
  selector: 'app-meals-add',
  templateUrl: './meals-add.component.html',
  styleUrls: ['./meals-add.component.scss']
})
export class MealsAddComponent implements OnInit {
  mealsForm: FormGroup;
  @Input() isEdit;
  @Input() data: MealsModel;
  isLoading = false;
  selectedDishes: string[];
  selectedLocations: string[];
  datesSelected: NgbDateStruct[] = [];
  dishesList: Array<DishesModel>;
  locationsList: Array<LocationsModel>;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private mealsService: MealsService,
              private dishesService: DishesService,
              private locationsService: LocationsService) {
    this.mealsForm = this.fb.group({
      description_en: ['', [Validators.required, Validators.minLength(3)]],
      description_sp: ['', [Validators.minLength(3)]]
    });
  }

  change(value: NgbDateStruct[]) {
    this.datesSelected = value;
  }

  ngOnInit() {
    if (this.data) {
      this.mealsForm.get('description_en').setValue(this.data.description_en);
      this.mealsForm.get('description_sp').setValue(this.data.description_sp);
      this.selectedDishes = this.data.dish_ids;
      this.selectedLocations = this.data.location_ids;
      for (const date of this.data.dates_available) {
        const splitDate = date.split('-');
        if (splitDate.length === 3) {
          this.datesSelected.push({ day: parseInt(splitDate[1], 10), month: parseInt(splitDate[0], 10), year: parseInt(splitDate[2], 10)});
        }
      }
    }

    this.dishesService.getList().subscribe(r => {
      this.dishesList = r;
    });

    this.locationsService.getList().subscribe(r => {
      this.locationsList = r;
    });
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new MealsModel();
    model.description_en = this.mealsForm.controls.description_en.value;
    model.description_sp = this.mealsForm.controls.description_sp.value;
    model.dish_ids = this.selectedDishes;
    model.location_ids = this.selectedLocations;
    if (this.datesSelected.length) {
      const dateHolder = [];
      for (const date of this.datesSelected) {
        dateHolder.push(date.month + '-' + date.day + '-' + date.year);
      }
      model.dates_available = dateHolder;
    } else {
      model.dates_available = [];
    }

    if (this.isEdit) {
      model.id = this.data.id;
      this.mealsService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.mealsService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }

}
