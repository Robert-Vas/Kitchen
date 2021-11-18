import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import {OrderComponent} from './order.component';


const routes: Routes = [
                        {path: '', component: OrderComponent},
                        {path: 'admin', component: OrderAdminComponent}
                       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
