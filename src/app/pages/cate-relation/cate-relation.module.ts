import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CateRelationRoutingModule } from './cate-relation-routing.module';
import { CateRelationComponent } from './cate-relation.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [CateRelationComponent],
  imports: [
    CommonModule,
    CateRelationRoutingModule,
    SharedModule
  ]
})
export class CateRelationModule { }
