import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GoodRoutingModule} from './good-routing.module';
import {GoodComponent} from './good.component';
import {GoodAddComponent} from './good-add/good-add.component';
import {SharedModule} from '../../shared/shared.module';
import {FileUploadModule} from '../../components/file-upload/file-upload.module';
import {QuillModule} from 'ngx-quill';
import {LoadingModule} from '../../components/loading/loading.module';
import {GoodReviewsComponent} from './good-reviews/good-reviews.component';
import {GoodPhotoComponent} from './good-photo/good-photo.component';
import {GoodPreviewComponent} from './good-preview/good-preview.component';


@NgModule({
  declarations: [GoodComponent, GoodAddComponent, GoodReviewsComponent, GoodPhotoComponent, GoodPreviewComponent],
  imports: [
    CommonModule,
    GoodRoutingModule,
    SharedModule,
    FileUploadModule,
    QuillModule,
    LoadingModule,
  ],
  entryComponents: [GoodAddComponent, GoodReviewsComponent, GoodPhotoComponent, GoodPreviewComponent]
})
export class GoodModule {
}
