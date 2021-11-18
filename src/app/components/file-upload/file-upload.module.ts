import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadComponent} from './file-upload.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [FileUploadComponent],
  exports: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class FileUploadModule {
}
