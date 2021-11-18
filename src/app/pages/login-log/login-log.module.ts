import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginLogRoutingModule } from './login-log-routing.module';
import { LoginLogComponent } from './login-log.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [LoginLogComponent],
  imports: [
    CommonModule,
    LoginLogRoutingModule,
    SharedModule
  ]
})
export class LoginLogModule { }
