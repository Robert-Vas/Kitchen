import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import {NzSpinModule} from 'ng-zorro-antd';



@NgModule({
  declarations: [LoadingComponent],
  exports: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    NzSpinModule
  ]
})
export class LoadingModule { }
