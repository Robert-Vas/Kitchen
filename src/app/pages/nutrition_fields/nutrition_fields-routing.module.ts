import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NutritionFieldsComponent} from './nutrition_fields.component';


const routes: Routes = [{path: '', component: NutritionFieldsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NutritionFieldsRoutingModule {
}
