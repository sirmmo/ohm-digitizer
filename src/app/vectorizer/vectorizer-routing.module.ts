import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguratorComponent } from './configurator/configurator.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':mode/:id', component: ConfiguratorComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class VectorizerRoutingModule { }
