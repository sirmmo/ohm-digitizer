import { IndexComponent } from './index/index.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'list', component: ListComponent },
  { path: 'images', loadChildren: () => import('./drawings/drawings.module').then(m => m.DrawingsModule) },
  { path: 'work/map', loadChildren: () => import('./georeferencer/georeferencer.module').then(m => m.GeoreferencerModule) },
  { path: 'work/text', loadChildren: () => import('./text/text.module').then(m => m.TextModule) },
  { path: 'work/picture', loadChildren: () => import('./picture/picture.module').then(m => m.PictureModule) },
  { path: 'work/view', loadChildren: () => import('./view/view.module').then(m => m.ViewModule) },
  { path: 'merge', loadChildren: () => import('./merger/merger.module').then(m => m.MergerModule) },
  { path: 'vectorize', loadChildren: () => import('./vectorizer/vectorizer.module').then(m => m.VectorizerModule) },
  { path: 'tag', loadChildren: () => import('./tagger/tagger.module').then(m => m.TaggerModule) },
  { path: 'upload', loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
