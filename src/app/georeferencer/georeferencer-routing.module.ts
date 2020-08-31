import { ListComponent } from './../drawings/list/list.component';
import { GeoreferencerComponent } from './georeferencer/georeferencer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: ':id', component: GeoreferencerComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class GeoreferencerRoutingModule { }
