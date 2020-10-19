import { MergerRoutingModule } from './merger-routing.module';
import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './selector/selector.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [SelectorComponent, ListComponent],
  imports: [
    CommonModule,
    MergerRoutingModule,
    SharedModule
  ]
})
export class MergerModule { }
