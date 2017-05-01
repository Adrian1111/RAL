"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var reddit_feed_models_1 = require("./reddit_feed.models");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var ArticleService = (function () {
    /*private result: Article;*/
    function ArticleService(http) {
        this.http = http;
        this.articlesUrl = 'https://www.reddit.com/r/UpliftingNews/new.json';
        this.articleUrl = 'https://www.reddit.com/r/UpliftingNews/comments/';
        this.commentUrl = 'https://jsonplaceholder.typicode.com/posts';
    }
    ArticleService.prototype.getArticles = function (prev, next, artNum) {
        var params = new http_1.URLSearchParams();
        params.set('limit', artNum.toString());
        if (prev) {
            params.set('before', 't3_' + prev);
        }
        if (next) {
            params.set('after', 't3_' + next);
        }
        return this.http.get(this.articlesUrl, { search: params })
            .map(function (response) { return response.json(); })
            .map(function (json) { return json.data.children; })
            .map(function (children) { return children.map(function (d) { return new reddit_feed_models_1.Article(d.data.id, d.data.title, d.data.url, d.data.author, d.data.created); }); })
            .catch(this.handleError);
    };
    ArticleService.prototype.getArticle = function (id) {
        return this.http.get(this.articleUrl + id + '.json')
            .map(function (res) { return res.json(); })
            .map(function (json) { return json[0].data.children[0]; })
            .map(function (d) { return new reddit_feed_models_1.Article(d.data.id, d.data.title, d.data.url, d.data.author, d.data.created); })
            .catch(this.handleError);
    };
    ArticleService.prototype.getComments = function (id) {
        return this.http.get(this.articleUrl + id + '.json')
            .map(function (res) { return res.json(); })
            .map(function (json) { return json[1].data.children; })
            .map(function (children) { return children.map(function (d) { return new reddit_feed_models_1.Comment(d.data.id, d.data.body, d.data.author, d.data.created); }); });
    };
    // faked endpoint for reddits: /api/comment
    ArticleService.prototype.postComment = function (api_type, text, thing_id) {
        var params = new http_1.URLSearchParams();
        params.set('api_type', api_type);
        params.set('text', text);
        params.set('thing_id', thing_id);
        return this.http.post(this.commentUrl, { search: params })
            .map(function (res) { return res.json(); });
    };
    ArticleService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return ArticleService;
}());
ArticleService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map