import { SharedModule } from './../shared.module';
import { TaggerComponent } from './tagger/tagger.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaggerRoutingModule } from './tagger-routing.module';
import { ListComponent } from './list/list.component';
import { MapmetaComponent } from './mapmeta/mapmeta.component';
import { TextmetaComponent } from './textmeta/textmeta.component';
import { ViewmetaComponent } from './viewmeta/viewmeta.component';
import { MetaComponent } from './meta/meta.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [TaggerComponent, ListComponent, MapmetaComponent, TextmetaComponent, ViewmetaComponent, MetaComponent, InfoComponent],
  imports: [
    CommonModule,
    TaggerRoutingModule,
    SharedModule
  ]
})
export class TaggerModule { }
