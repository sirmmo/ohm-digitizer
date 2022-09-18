import { GeoreferencerRoutingModule } from './georeferencer-routing.module';
import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoreferencerComponent } from './georeferencer/georeferencer.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { InfoComponent } from './info/info.component';
import { KnownComponent } from './known/known.component';
import { RefsComponent } from './refs/refs.component';



@NgModule({
  declarations: [GeoreferencerComponent, AdvancedComponent, InfoComponent, KnownComponent, RefsComponent],
  imports: [
    CommonModule,
    GeoreferencerRoutingModule,
    SharedModule,
  ]
})
export class GeoreferencerModule { }
