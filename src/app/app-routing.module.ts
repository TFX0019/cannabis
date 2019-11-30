import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailNewComponent } from './components/detail-new/detail-new.component';
import { NewsComponent } from './components/news/news.component';
import { EditNewComponent } from './components/edit-new/edit-new.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'new/:id', component: DetailNewComponent },
  { path: 'news', component: NewsComponent },
  { path: 'edit', component: EditNewComponent },
  { path: 'edit/:id', component: EditNewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
