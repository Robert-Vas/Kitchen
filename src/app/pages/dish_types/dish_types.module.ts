import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DishTypesRoutingModule} from './dish_types-routing.module';
import {DishTypesComponent} from './dish_types.component';
import {DishTypesAddComponent} from './dish_types-add/dish_types-add.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [DishTypesComponent, DishTypesAddComponent],
  imports: [
    CommonModule,
    DishTypesRoutingModule,
    SharedModule
  ],
  entryComponents: [DishTypesAddComponent]
})
export class DishTypesModule {
}
