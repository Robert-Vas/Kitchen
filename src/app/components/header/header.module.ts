import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {HeaderFullscreenComponent} from './header-fullscreen/header-fullscreen.component';
import {HeaderIconComponent} from './header-icon/header-icon.component';
import {HeaderNotifyComponent} from './header-notify/header-notify.component';
import {HeaderUserComponent} from './header-user/header-user.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import { HeaderLanguageComponent } from './header-language/header-language.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HeaderFullscreenComponent,
    HeaderIconComponent,
    HeaderNotifyComponent,
    HeaderUserComponent,
    HeaderLanguageComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class HeaderModule {
}
