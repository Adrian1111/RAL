import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Article, Comment} from './reddit_feed.models';
import { ArticleService }  from './article.service';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer  } from '@angular/platform-browser';

@Component({
  templateUrl: './article-detail.component.html'
})
export class ArticleDetailComponent implements OnInit {
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  article: Article;
  comments: Observable<Comment[]>;
  textComment: string;
  commentSent: boolean;

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
    this.comments.subscribe(x => {console.log(x); });
  }
  postComment(type: string, text: string, article: string) {
    // here you can see that model is actually send
      console.log(type, text, article);
      this.route.params
          .switchMap((params: Params) => this.service.postComment(type, text, 't3_' + article))
          .subscribe( (responsetext: any) => {
          // wait 3 Seconds and hide
            if (responsetext !== null) {
                setTimeout(function() {
                this.commentSent = false;
              }.bind(this), 3000);
            }
          }
          );
  }
  gotoArticles() {
    let articleId = this.article ? this.article.id : null;
    this.router.navigate(['/articles', { id: articleId, foo: 'foo' }]);
  }
}
