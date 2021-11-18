import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CouponRoutingModule} from './coupon-routing.module';
import {CouponComponent} from './coupon.component';
import {CouponAddComponent} from './coupon-add/coupon-add.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [CouponComponent, CouponAddComponent],
  imports: [
    CommonModule,
    CouponRoutingModule,
    SharedModule
  ],
  entryComponents: [CouponAddComponent]
})
export class CouponModule {
}
