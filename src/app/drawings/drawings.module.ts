import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingsRouterModule } from './drawings-routing.module';

import { SharedModule } from './../shared.module';

import { EditorComponent } from './editor/editor.component';
import { MetaComponent } from './meta/meta.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [EditorComponent, MetaComponent, ListComponent],
  imports: [
    CommonModule,
    DrawingsRouterModule,

    SharedModule,
  ]
})
export class DrawingsModule { }
