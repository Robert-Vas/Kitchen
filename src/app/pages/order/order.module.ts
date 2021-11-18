import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderRoutingModule} from './order-routing.module';
import {OrderComponent} from './order.component';
import {SharedModule} from '../../shared/shared.module';
import {OrderViewComponent} from './order-view/order-view.component';
import {OrderEditComponent} from './order-edit/order-edit.component';
import { MatButtonModule, MatCardModule, MatGridListModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { OrderCardComponent } from './order-card/order-card.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';


@NgModule({
  declarations: [OrderComponent, OrderViewComponent, OrderEditComponent, OrderCardComponent, OrderAdminComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule
  ],
  entryComponents: [OrderViewComponent, OrderEditComponent]
})
export class OrderModule {
}
