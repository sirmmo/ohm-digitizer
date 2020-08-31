import { VectorizerRoutingModule } from './vectorizer-routing.module';
import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorComponent } from './configurator/configurator.component';



@NgModule({
  declarations: [ConfiguratorComponent],
  imports: [
    CommonModule,
    VectorizerRoutingModule,
    SharedModule,
  ]
})
export class VectorizerModule { }
