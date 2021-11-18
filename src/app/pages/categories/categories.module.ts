import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesComponent} from './categories.component';
import {CategoriesAddComponent} from './categories-add/categories-add.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [CategoriesComponent, CategoriesAddComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ],
  entryComponents: [CategoriesAddComponent]
})
export class CategoriesModule {
}
