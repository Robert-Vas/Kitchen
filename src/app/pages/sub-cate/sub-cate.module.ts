import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubCateRoutingModule} from './sub-cate-routing.module';
import {SubCateComponent} from './sub-cate.component';
import {SubCateAddComponent} from './sub-cate-add/sub-cate-add.component';
import {SharedModule} from '../../shared/shared.module';
import {FileUploadModule} from '../../components/file-upload/file-upload.module';


@NgModule({
  declarations: [SubCateComponent, SubCateAddComponent],
  imports: [
    CommonModule,
    SubCateRoutingModule,
    SharedModule,
    FileUploadModule
  ],
  entryComponents: [SubCateAddComponent]
})
export class SubCateModule {
}
