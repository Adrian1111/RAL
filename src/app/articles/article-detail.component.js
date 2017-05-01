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
var ArticleDetailComponent = (function () {
    function ArticleDetailComponent(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
        this.display = 'block';
        this.position = 'absolute';
    }
    ArticleDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.service.getArticle(params['id']); })
            .subscribe(function (article) {
            _this.article = article;
            _this.url = article.url;
        });
        this.comments = this.route.params
            .switchMap(function (params) {
            return _this.service.getComments(params['id']);
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
        template: "\n  <div *ngIf=\"article\">\n    <h2>\"{{ article.title }}\"</h2>\n      <iframe [src]=\"article.url\"></iframe>{{url}}\n    \n  </div>\n  <h2>Comments</h2>\n  <ul>\n      <li *ngFor=\"let comment of comments | async\">\n        <span class=\"badge\">{{ comment.author }}</span> {{ comment.body }}\n      </li>\n   </ul>\n   <p class=\"bottomBtnsB\">\n      <button (click)=\"gotoArticles()\">Back</button>\n   </p>\n  "
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        article_service_1.ArticleService])
], ArticleDetailComponent);
exports.ArticleDetailComponent = ArticleDetailComponent;
//# sourceMappingURL=article-detail.component.js.map