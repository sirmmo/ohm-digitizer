import { GeoreferencerRoutingModule } from './georeferencer-routing.module';
import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoreferencerComponent } from './georeferencer/georeferencer.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { InfoComponent } from './info/info.component';



@NgModule({
  declarations: [GeoreferencerComponent, AdvancedComponent, InfoComponent],
  imports: [
    CommonModule,
    GeoreferencerRoutingModule,
    SharedModule,
  ]
})
export class GeoreferencerModule { }
