import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NoticeRoutingModule} from './notice-routing.module';
import {NoticeComponent} from './notice.component';
import {NoticeAddComponent} from './notice-add/notice-add.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [NoticeComponent, NoticeAddComponent],
  imports: [
    CommonModule,
    NoticeRoutingModule,
    SharedModule
  ],
  entryComponents: [NoticeAddComponent]
})
export class NoticeModule {
}
