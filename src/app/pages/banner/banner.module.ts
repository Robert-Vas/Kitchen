import {NgModule} from '@angular/core';
import {BannerRoutingModule} from './banner-routing.module';
import {BannerComponent} from './banner.component';
import {SharedModule} from '../../shared/shared.module';
import {BannerEditComponent} from './banner-edit/banner-edit.component';
import {FileUploadModule} from '../../components/file-upload/file-upload.module';
import {LoadingModule} from '../../components/loading/loading.module';


@NgModule({
  declarations: [BannerComponent, BannerEditComponent],
  imports: [
    BannerRoutingModule,
    SharedModule,
    FileUploadModule,
    LoadingModule
  ],
  entryComponents: [BannerEditComponent]
})
export class BannerModule {
}
