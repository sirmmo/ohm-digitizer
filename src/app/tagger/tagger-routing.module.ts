import { ListComponent } from './list/list.component';
import { TaggerComponent } from './tagger/tagger.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':id', component: TaggerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaggerRoutingModule { }
