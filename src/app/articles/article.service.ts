import { Article, Comment } from './reddit_feed.models';
import { Injectable }              from '@angular/core';
import { Http, Response, URLSearchParams }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
  private articlesUrl = 'https://www.reddit.com/r/UpliftingNews/new.json';
  private articleUrl =  'https://www.reddit.com/r/UpliftingNews/comments/';
  private commentUrl = 'https://jsonplaceholder.typicode.com/posts';
  /*private result: Article;*/
  constructor (private http: Http) {}
  getArticles(prev: string, next: string, artNum: number): Observable<Article[]> {
      let params = new URLSearchParams();
      params.set('limit', artNum.toString());
      if (prev) {
          params.set('before', 't3_' + prev);
      }
      if (next) {
          params.set('after', 't3_' + next);
      }
    return this.http.get(this.articlesUrl, {search: params})
        .map(response => response.json())
        .map(json => <Array<any>>json.data.children)
        .map(children => children.map(d => new Article(d.data.id, d.data.title,
            d.data.url, d.data.author, d.data.created)))
        .catch(this.handleError);
  }
  getArticle(id: string): Observable <Article> {
     return this.http.get(this.articleUrl + id + '.json')
          .map((res: Response) => res.json())
          .map(json => <any>json[0].data.children[0])
         .map(d => new Article(d.data.id, d.data.title,
             d.data.url, d.data.author, d.data.created))
         .catch(this.handleError);
 }
 getComments(id: string): Observable<Comment[]> {
   return this.http.get(this.articleUrl + id + '.json')
       .map((res: Response) => res.json())
       .map(json => <Array<any>>json[1].data.children)
       .map(children => children.map(d => new Comment(d.data.id,
           d.data.body, d.data.author, d.data.created)));
 }
 // faked endpoint for reddits: /api/comment
 postComment(api_type: string, text: string, thing_id: string): Observable<any> {
     let params = new URLSearchParams();
     params.set('api_type', api_type);
     params.set('text', text);
     params.set('thing_id', thing_id);
      return this.http.post(this.commentUrl, {search: params})
          .map((res: Response) => res.json());
 }


  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
