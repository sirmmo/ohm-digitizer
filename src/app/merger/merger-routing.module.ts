import { ListComponent } from './list/list.component';
import { SelectorComponent } from './selector/selector.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':ids', component: SelectorComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MergerRoutingModule { }
