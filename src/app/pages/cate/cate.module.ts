import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CateRoutingModule} from './cate-routing.module';
import {CateComponent} from './cate.component';
import {CateAddComponent} from './cate-add/cate-add.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [CateComponent, CateAddComponent],
  imports: [
    CommonModule,
    CateRoutingModule,
    SharedModule
  ],
  entryComponents: [CateAddComponent]
})
export class CateModule {
}
