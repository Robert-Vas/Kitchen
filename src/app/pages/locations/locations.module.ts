import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocationsRoutingModule} from './locations-routing.module';
import {LocationsComponent} from './locations.component';
import {LocationsAddComponent} from './locations-add/locations-add.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [LocationsComponent, LocationsAddComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    SharedModule
  ],
  entryComponents: [LocationsAddComponent]
})
export class LocationsModule {
}
