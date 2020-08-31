import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextRoutingModule } from './text-routing.module';
import { ViewerComponent } from './viewer/viewer.component';


@NgModule({
  declarations: [ViewerComponent],
  imports: [
    CommonModule,
    TextRoutingModule,
    SharedModule
  ]
})
export class TextModule { }
