import { SharedModule } from './../app/shared.module';
import { UploaderComponent } from './uploader/uploader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploaderRoutingModule } from './uploader-routing.module';


@NgModule({
  declarations: [UploaderComponent],
  imports: [
    CommonModule,
    UploaderRoutingModule,
    SharedModule
  ]
})
export class UploaderModule { }
