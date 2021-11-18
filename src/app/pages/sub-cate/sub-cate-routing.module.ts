import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SubCateComponent} from './sub-cate.component';


const routes: Routes = [{path: '', component: SubCateComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCateRoutingModule {
}
