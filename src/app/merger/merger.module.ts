import { MergerRoutingModule } from './merger-routing.module';
import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './selector/selector.component';



@NgModule({
  declarations: [SelectorComponent],
  imports: [
    CommonModule,
    MergerRoutingModule,
    SharedModule
  ]
})
export class MergerModule { }
