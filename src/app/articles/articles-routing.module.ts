import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleListComponent }    from './article-list.component';
import { ArticleDetailComponent }  from './article-detail.component';

const articlesRoutes: Routes = [
  { path: 'articles',  component: ArticleListComponent },
  { path: 'article/:id', component: ArticleDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(articlesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArticleRoutingModule { }
