import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DishTypesComponent} from './dish_types.component';


const routes: Routes = [{path: '', component: DishTypesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishTypesRoutingModule {
}
