import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ArticleListComponent }    from './article-list.component';
import { ArticleDetailComponent }  from './article-detail.component';

import { ArticleService } from './article.service';

import { ArticleRoutingModule } from './articles-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ArticleRoutingModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent
  ],
  providers: [ ArticleService ]
})
export class ArticlesModule {}
