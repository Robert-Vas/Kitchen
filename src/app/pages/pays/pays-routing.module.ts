import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PaysComponent} from './pays.component';


const routes: Routes = [{path: '', component: PaysComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaysRoutingModule {
}
