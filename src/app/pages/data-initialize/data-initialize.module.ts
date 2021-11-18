import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataInitializeRoutingModule } from './data-initialize-routing.module';
import { DataInitializeComponent } from './data-initialize.component';
import {SharedModule} from '../../shared/shared.module';
import {LoadingModule} from '../../components/loading/loading.module';


@NgModule({
  declarations: [DataInitializeComponent],
  imports: [
    CommonModule,
    DataInitializeRoutingModule,
    SharedModule,
    LoadingModule
  ]
})
export class DataInitializeModule { }
