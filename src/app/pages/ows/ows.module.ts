import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OwsRoutingModule} from './ows-routing.module';
import {OwsComponent} from './ows.component';
import {OwsAddComponent} from './ows-add/ows-add.component';
import {SharedModule} from '../../shared/shared.module';
import {LoadingModule} from '../../components/loading/loading.module';


@NgModule({
  declarations: [OwsComponent, OwsAddComponent],
  imports: [
    CommonModule,
    OwsRoutingModule,
    SharedModule,
    LoadingModule
  ],
  entryComponents: [OwsAddComponent]
})
export class OwsModule {
}
