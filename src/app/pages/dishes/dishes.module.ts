import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DishesRoutingModule} from './dishes-routing.module';
import {DishesComponent} from './dishes.component';
import {DishesAddComponent} from './dishes-add/dishes-add.component';
import {SharedModule} from '../../shared/shared.module';
import {FileUploadModule} from '../../components/file-upload/file-upload.module';
import {QuillModule} from 'ngx-quill';
import {LoadingModule} from '../../components/loading/loading.module';
import {DishesReviewsComponent} from './dishes-reviews/dishes-reviews.component';
import {DishesPhotoComponent} from './dishes-photo/dishes-photo.component';
import {DishesPreviewComponent} from './dishes-preview/dishes-preview.component';
import { DishesVideoComponent } from './dishes-video/dishes-video.component';
import { DishesAddVideoComponent } from './dishes-add/dishes-add-video/dishes-add-video.component';


@NgModule({
  declarations: [DishesComponent, DishesAddComponent, DishesReviewsComponent, DishesPhotoComponent, DishesPreviewComponent, DishesVideoComponent, DishesAddVideoComponent],
  imports: [
    CommonModule,
    DishesRoutingModule,
    SharedModule,
    FileUploadModule,
    QuillModule,
    LoadingModule,
  ],
  entryComponents: [DishesAddComponent, DishesReviewsComponent, DishesPhotoComponent, DishesPreviewComponent, DishesVideoComponent]
})
export class DishesModule {
}
