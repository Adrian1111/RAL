
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ArticleService }  from './article.service';
import {Article} from './reddit_feed.models';

@Component({
  template: `
<table class="mainTable table-striped table-bordered table-hover table-condensed table-responsive">
    <thead>
    <tr>
        <th>Id</th>
        <th>Author</th>
        <th>Name</th>
        <th>Created</th>
    </tr>
    </thead>
    <tbody >
        <tr *ngFor="let i = index; let article of articles | async" 
        [class.selected]="isSelected(article)"
        (click)="onSelect(article)">
        <td>{{(i+1) + (artNumberPerPage * (currentPage - 1))}}</td>
        <td>{{ article.author}}</td>
        <td>{{ article.title }}</td>
        <td>{{ article.created_utc * 1000 | date : "MM/dd/yyyy 'at' h:mma"}}</td>
        </tr>
    </tbody>
    
</table>
<div class="bottomBtns">
      <button (click)="pagination('first')"
              class="btn btn-xs btn-primary" [disabled]="currentPage == 1">first
      </button>
      <button (click)="pagination('prev')"
              class="btn btn-xs btn-primary" [disabled]="currentPage == 1">previous
      </button>
      <div class="pageNum">{{currentPage}}</div>
      <button (click)="pagination('next')"
              class="btn btn-xs btn-primary">next
      </button>
</div>

  `
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
