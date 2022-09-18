import { ListComponent } from './list/list.component';
import { EditorComponent } from './editor/editor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'list/:id/edit', component: EditorComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DrawingsRouterModule { }
