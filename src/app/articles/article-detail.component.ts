import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Article, Comment} from './reddit_feed.models';
import { ArticleService }  from './article.service';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer  } from '@angular/platform-browser';

@Component({
  template: `
  <div *ngIf="article">
    <h2>"{{ article.title }}"</h2>
      <iframe width="1200" height="700" [src]="sanitizer.bypassSecurityTrustResourceUrl(article.url)"></iframe>
    
  </div>
  <h2>Comments</h2>
  <ul>
      <li *ngFor="let comment of comments | async">
        <span class="badge">{{ comment.author }}</span> {{ comment.body }}
      </li>
   </ul>
   <p class="bottomBtnsB">
      <button (click)="gotoArticles()">Back</button>
   </p>
  `
})
export class ArticleDetailComponent implements OnInit {
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  article: Article;
  comments: Observable<Comment[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ArticleService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.service.getArticle( params['id'] ))
      .subscribe((article: Article) => this.article = article);

    this.comments = this.route.params
        .switchMap((params: Params) => {
          return this.service.getComments( params['id'] );
        });
  }

  gotoArticles() {
    let articleId = this.article ? this.article.id : null;
    this.router.navigate(['/articles', { id: articleId, foo: 'foo' }]);
  }
}
