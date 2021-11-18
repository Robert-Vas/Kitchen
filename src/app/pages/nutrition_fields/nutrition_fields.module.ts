import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NutritionFieldsRoutingModule} from './nutrition_fields-routing.module';
import {NutritionFieldsComponent} from './nutrition_fields.component';
import {NutritionFieldsAddComponent} from './nutrition_fields-add/nutrition_fields-add.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [NutritionFieldsComponent, NutritionFieldsAddComponent],
  imports: [
    CommonModule,
    NutritionFieldsRoutingModule,
    SharedModule
  ],
  entryComponents: [NutritionFieldsAddComponent]
})
export class NutritionFieldsModule {
}
