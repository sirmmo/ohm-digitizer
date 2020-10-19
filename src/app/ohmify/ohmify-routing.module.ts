import { ListComponent } from './list/list.component';
import { OhmifyComponent } from './ohmify/ohmify.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':id', component: OhmifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OhmifyRoutingModule { }
