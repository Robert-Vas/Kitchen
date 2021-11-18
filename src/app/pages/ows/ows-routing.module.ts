import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OwsComponent} from './ows.component';


const routes: Routes = [{path: '', component: OwsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwsRoutingModule {
}
