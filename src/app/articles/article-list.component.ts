
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ArticleService }  from './article.service';
import {Article} from './reddit_feed.models';

@Component({
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {
  articles: Observable<Article[]>;

  private selectedId: number;
  private artNumberPerPage = 10;
  private currentPage = 1;
  private lastArticleOnPageId: string;
  private firstArticleOnPageId: string;

  constructor(
    private service: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
      this.getArticles(null, null);
      this.getIdsBorder();
  }
  getArticles(val1: string, val2: string) {
      this.articles = this.route.params
          .switchMap((params: Params) => {
              this.selectedId = +params['id'];
              return this.service.getArticles(val1, val2, this.artNumberPerPage);
          });
  }
getIdsBorder() {
    this.articles.subscribe((someArray: any[]) => {

        this.setLastArticleOnPageId(someArray[ this.artNumberPerPage - 1 ].id);
        this.setFirstArticleOnPageId(someArray[ 0  ].id);
    });
}
  private pagination(val: string) {
    if (val === 'first') {
        this.getArticles(null, null);
      this.currentPage = 1;
    } else if (val === 'prev') {
        this.getArticles(this.getFirstArticleOnPageId(), null);
      this.currentPage--;
    } else if (val === 'next') {
        this.getArticles(null, this.getLastArticleOnPageId());
      this.currentPage++;
    } else {
      return 0;
    }
      this.getIdsBorder();
  }
  isSelected(article: Article) { return Number(article.id) === this.selectedId; }

  onSelect(article: Article) {
    this.router.navigate(['/article', article.id]);
  }
    public setCurrentPage(val: number) {
        this.currentPage = val;
    }
    public setFirstArticleOnPageId(val: string) {
        this.firstArticleOnPageId = val;
    }

    public setArticlesNumberPerPage(val: number) {
        this.artNumberPerPage = val;
    }

    public getArticlesNumberPerPage() {
        return this.artNumberPerPage;
    }

    public getFirstArticleOnPageId() {
        return this.firstArticleOnPageId;
    }

    public setLastArticleOnPageId(val: string) {
        this.lastArticleOnPageId = val;
    }

    public getLastArticleOnPageId() {
        return this.lastArticleOnPageId;
    }
}
