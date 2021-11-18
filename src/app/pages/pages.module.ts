import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SharedModule} from '../shared/shared.module';
import {HeaderModule} from '../components/header/header.module';
import {TranslateModule} from '@ngx-translate/core';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [PagesComponent, NotFoundComponent, QrScannerComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    HeaderModule,
    TranslateModule,
    ZXingScannerModule
  ]
})
export class PagesModule {
}
