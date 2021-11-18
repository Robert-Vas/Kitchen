import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPassRoutingModule } from './forgot-pass-routing.module';
import { ForgotPassComponent } from './forgot-pass.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [ForgotPassComponent],
  imports: [
    CommonModule,
    ForgotPassRoutingModule,
    SharedModule
  ]
})
export class ForgotPassModule { }
