import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaysRoutingModule} from './pays-routing.module';
import {PaysComponent} from './pays.component';
import {PaysAddComponent} from './pays-add/pays-add.component';
import {SharedModule} from '../../shared/shared.module';
import {FileUploadModule} from '../../components/file-upload/file-upload.module';


@NgModule({
  declarations: [PaysComponent, PaysAddComponent],
  imports: [
    CommonModule,
    PaysRoutingModule,
    SharedModule,
    FileUploadModule
  ],
  entryComponents: [PaysAddComponent]
})
export class PaysModule {
}
