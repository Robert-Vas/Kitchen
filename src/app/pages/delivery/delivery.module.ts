import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DeliveryRoutingModule} from './delivery-routing.module';
import {DeliveryComponent} from './delivery.component';
import {DeliveryAddComponent} from './delivery-add/delivery-add.component';
import {SharedModule} from '../../shared/shared.module';
import {LoadingModule} from '../../components/loading/loading.module';


@NgModule({
  declarations: [DeliveryComponent, DeliveryAddComponent],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    SharedModule,
    LoadingModule
  ],
  entryComponents: [DeliveryAddComponent]
})
export class DeliveryModule {
}
