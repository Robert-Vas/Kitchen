import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IngredientsRoutingModule} from './ingredients-routing.module';
import {IngredientsComponent} from './ingredients.component';
import {IngredientsAddComponent} from './ingredients-add/ingredients-add.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [IngredientsComponent, IngredientsAddComponent],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    SharedModule
  ],
  entryComponents: [IngredientsAddComponent]
})
export class IngredientsModule {
}
