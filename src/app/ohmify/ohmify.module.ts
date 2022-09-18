import { SharedModule } from './../shared.module';
import { OhmifyComponent } from './ohmify/ohmify.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OhmifyRoutingModule } from './ohmify-routing.module';
import { ListComponent } from './list/list.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [OhmifyComponent, ListComponent, InfoComponent],
  imports: [
    CommonModule,
    OhmifyRoutingModule,
    SharedModule
  ]
})
export class OhmifyModule { }
