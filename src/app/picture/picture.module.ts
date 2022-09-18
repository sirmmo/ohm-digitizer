import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PictureRoutingModule } from './picture-routing.module';
import { ViewerComponent } from './viewer/viewer.component';


@NgModule({
  declarations: [ViewerComponent],
  imports: [
    CommonModule,
    PictureRoutingModule,
    SharedModule
  ]
})
export class PictureModule { }
