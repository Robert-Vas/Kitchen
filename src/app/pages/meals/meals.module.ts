import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {MealsRoutingModule} from './meals-routing.module';
import {MealsComponent} from './meals.component';
import {MealsAddComponent} from './meals-add/meals-add.component';
import {SharedModule} from '../../shared/shared.module';
import {MultiDatePicker} from './multi-date-picker/multi-date-picker'



@NgModule({
  declarations: [MealsComponent, MealsAddComponent, MultiDatePicker],
  imports: [
    CommonModule,
    MealsRoutingModule,
    SharedModule,
    NgbModule
  ],
  entryComponents: [MealsAddComponent]
})
export class MealsModule {
}
