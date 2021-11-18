import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginLogComponent} from './login-log.component';


const routes: Routes = [{path: '', component: LoginLogComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginLogRoutingModule {
}
