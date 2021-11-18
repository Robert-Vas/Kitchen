import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AllergensRoutingModule} from './allergens-routing.module';
import {AllergensComponent} from './allergens.component';
import {AllergensAddComponent} from './allergens-add/allergens-add.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AllergensComponent, AllergensAddComponent],
  imports: [
    CommonModule,
    AllergensRoutingModule,
    SharedModule
  ],
  entryComponents: [AllergensAddComponent]
})
export class AllergensModule {
}
