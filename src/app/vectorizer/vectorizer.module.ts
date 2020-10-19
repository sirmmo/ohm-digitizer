import { VectorizerRoutingModule } from './vectorizer-routing.module';
import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { ListComponent } from './list/list.component';
import { MetaComponent } from './meta/meta.component';



@NgModule({
  declarations: [ConfiguratorComponent, ListComponent, MetaComponent],
  imports: [
    CommonModule,
    VectorizerRoutingModule,
    SharedModule,
  ]
})
export class VectorizerModule { }
