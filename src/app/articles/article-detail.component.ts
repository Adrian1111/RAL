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
  <div class="container">
  <h2>Comments</h2>
  <ul>
      <li *ngFor="let comment of comments | async">
        <span class="badge">{{ comment.author }}</span> {{ comment.body }}
      </li>
   </ul>
</div>
   
<div class="container">
  <h2>Add a comment</h2>
  <div *ngIf="commentSent" class="alert alert-success alert-dismissable fade in">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    <strong>Success!</strong> Comment has been added.
  </div>
  <form class="form-horizontal">
    <div class="form-group">
      <label class="control-label col-sm-2" for="email">Your comment:</label>
      <div class="col-sm-10">
        <input [(ngModel)]="textComment" type="text" class="form-control" id="comment" placeholder="Enter text" name="comment">
      </div>
    </div>
    <div class="form-group">        
      <div class="col-sm-offset-2 col-sm-10">
        <button (click)="commentSent = true; postComment('json', textComment, article.id)" type="submit" class="btn btn-default">Submit</button>
      </div>
    </div>
  </form>
</div>

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
  textComment: string;
  commentSent: bool;

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
  postComment(type: string, text: string, article: string) {
    // here you can see that model is actually send
      console.log(type, text, article);
      this.route.params
          .switchMap((params: Params) => this.service.postComment(type, text, 't3_' + article))
          .subscribe( (responsetext: any) => {
          //wait 3 Seconds and hide
            if(responsetext !== null){
              setTimeout(function() {
                this.commentSent = false;
              }.bind(this), 3000);
              );
            }
  }
  gotoArticles() {
    let articleId = this.article ? this.article.id : null;
    this.router.navigate(['/articles', { id: articleId, foo: 'foo' }]);
  }
}
