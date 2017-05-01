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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var article_service_1 = require("./article.service");
var platform_browser_1 = require("@angular/platform-browser");
var ArticleDetailComponent = (function () {
    function ArticleDetailComponent(route, router, service, sanitizer) {
        this.route = route;
        this.router = router;
        this.service = service;
        this.sanitizer = sanitizer;
        this.display = 'block';
        this.position = 'absolute';
    }
    ArticleDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.service.getArticle(params['id']); })
            .subscribe(function (article) { return _this.article = article; });
        this.comments = this.route.params
            .switchMap(function (params) {
            return _this.service.getComments(params['id']);
        });
    };
    ArticleDetailComponent.prototype.postComment = function (type, text, article) {
        var _this = this;
        // here you can see that model is actually send
        console.log(type, text, article);
        this.route.params
            .switchMap(function (params) { return _this.service.postComment(type, text, 't3_' + article); })
            .subscribe(function (responsetext) {
            //wait 3 Seconds and hide
            if (responsetext !== null) {
                setTimeout(function () {
                    this.commentSent = false;
                }.bind(_this), 3000);
            }
        });
    };
    ArticleDetailComponent.prototype.gotoArticles = function () {
        var articleId = this.article ? this.article.id : null;
        this.router.navigate(['/articles', { id: articleId, foo: 'foo' }]);
    };
    return ArticleDetailComponent;
}());
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], ArticleDetailComponent.prototype, "display", void 0);
__decorate([
    core_1.HostBinding('style.position'),
    __metadata("design:type", Object)
], ArticleDetailComponent.prototype, "position", void 0);
ArticleDetailComponent = __decorate([
    core_1.Component({
        template: "\n<div *ngIf=\"article\">\n    <h2>\"{{ article.title }}\"</h2>\n      <iframe width=\"1200\" height=\"700\" [src]=\"sanitizer.bypassSecurityTrustResourceUrl(article.url)\"></iframe>\n  </div>\n  <div class=\"container\">\n  <h2>Comments</h2>\n  <ul>\n      <li *ngFor=\"let comment of comments | async\">\n        <span class=\"badge\">{{ comment.author }}</span> {{ comment.body }}\n      </li>\n   </ul>\n</div>\n   \n<div class=\"container\">\n  <h2>Add a comment</h2>\n  <div *ngIf=\"commentSent\" class=\"alert alert-success alert-dismissable fade in\">\n    <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n    <strong>Success!</strong> Comment has been added.\n  </div>\n  <form class=\"form-horizontal\">\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-2\" for=\"email\">Your comment:</label>\n      <div class=\"col-sm-10\">\n        <input [(ngModel)]=\"textComment\" type=\"text\" class=\"form-control\" id=\"comment\" placeholder=\"Enter text\" name=\"comment\">\n      </div>\n    </div>\n    <div class=\"form-group\">        \n      <div class=\"col-sm-offset-2 col-sm-10\">\n        <button (click)=\"commentSent = true; postComment('json', textComment, article.id)\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n      </div>\n    </div>\n  </form>\n</div>\n\n   <p class=\"bottomBtnsB\">\n      <button (click)=\"gotoArticles()\">Back</button>\n   </p>\n  "
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        article_service_1.ArticleService,
        platform_browser_1.DomSanitizer])
], ArticleDetailComponent);
exports.ArticleDetailComponent = ArticleDetailComponent;
//# sourceMappingURL=article-detail.component.js.map