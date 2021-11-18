import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'pages/dashboard'},
  {path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  {path: 'sign-up', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)},
  {path: 'forgot-pass', loadChildren: () => import('./pages/forgot-pass/forgot-pass.module').then(m => m.ForgotPassModule)},
  {path: 'lock', loadChildren: () => import('./pages/lock/lock.module').then(m => m.LockModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
