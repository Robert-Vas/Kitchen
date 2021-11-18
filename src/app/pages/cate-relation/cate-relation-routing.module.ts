import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CateRelationComponent} from './cate-relation.component';


const routes: Routes = [{path: '', component: CateRelationComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CateRelationRoutingModule {
}
