import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ForgotPassComponent} from './forgot-pass.component';


const routes: Routes = [{path: '', component: ForgotPassComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPassRoutingModule {
}
