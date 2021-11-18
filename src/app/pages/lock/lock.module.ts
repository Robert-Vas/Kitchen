import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockRoutingModule } from './lock-routing.module';
import { LockComponent } from './lock.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [LockComponent],
  imports: [
    CommonModule,
    LockRoutingModule,
    SharedModule
  ]
})
export class LockModule { }
