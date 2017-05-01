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
var ArticleListComponent = (function () {
    function ArticleListComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.artNumberPerPage = 10;
        this.currentPage = 1;
    }
    ArticleListComponent.prototype.ngOnInit = function () {
        this.getArticles(null, null);
        this.getIdsBorder();
    };
    ArticleListComponent.prototype.getArticles = function (val1, val2) {
        var _this = this;
        this.articles = this.route.params
            .switchMap(function (params) {
            _this.selectedId = +params['id'];
            return _this.service.getArticles(val1, val2, _this.artNumberPerPage);
        });
    };
    ArticleListComponent.prototype.getIdsBorder = function () {
        var _this = this;
        this.articles.subscribe(function (someArray) {
            _this.setLastArticleOnPageId(someArray[_this.artNumberPerPage - 1].id);
            _this.setFirstArticleOnPageId(someArray[0].id);
        });
    };
    ArticleListComponent.prototype.pagination = function (val) {
        if (val === 'first') {
            this.getArticles(null, null);
            this.currentPage = 1;
        }
        else if (val === 'prev') {
            this.getArticles(this.getFirstArticleOnPageId(), null);
            this.currentPage--;
        }
        else if (val === 'next') {
            this.getArticles(null, this.getLastArticleOnPageId());
            this.currentPage++;
        }
        else {
            return 0;
        }
        this.getIdsBorder();
    };
    ArticleListComponent.prototype.isSelected = function (article) { return Number(article.id) === this.selectedId; };
    ArticleListComponent.prototype.onSelect = function (article) {
        this.router.navigate(['/article', article.id]);
    };
    ArticleListComponent.prototype.setCurrentPage = function (val) {
        this.currentPage = val;
    };
    ArticleListComponent.prototype.setFirstArticleOnPageId = function (val) {
        this.firstArticleOnPageId = val;
    };
    ArticleListComponent.prototype.setArticlesNumberPerPage = function (val) {
        this.artNumberPerPage = val;
    };
    ArticleListComponent.prototype.getArticlesNumberPerPage = function () {
        return this.artNumberPerPage;
    };
    ArticleListComponent.prototype.getFirstArticleOnPageId = function () {
        return this.firstArticleOnPageId;
    };
    ArticleListComponent.prototype.setLastArticleOnPageId = function (val) {
        this.lastArticleOnPageId = val;
    };
    ArticleListComponent.prototype.getLastArticleOnPageId = function () {
        return this.lastArticleOnPageId;
    };
    return ArticleListComponent;
}());
ArticleListComponent = __decorate([
    core_1.Component({
        template: "\n<table class=\"mainTable table-striped table-bordered table-hover table-condensed table-responsive\">\n    <thead>\n    <tr>\n        <th>Id</th>\n        <th>Author</th>\n        <th>Name</th>\n        <th>Created</th>\n    </tr>\n    </thead>\n    <tbody >\n        <tr *ngFor=\"let i = index; let article of articles | async\" \n        [class.selected]=\"isSelected(article)\"\n        (click)=\"onSelect(article)\">\n        <td>{{(i+1) + (artNumberPerPage * (currentPage - 1))}}</td>\n        <td>{{ article.author}}</td>\n        <td>{{ article.title }}</td>\n        <td>{{ article.created_utc * 1000 | date : \"MM/dd/yyyy 'at' h:mma\"}}</td>\n        </tr>\n    </tbody>\n    \n</table>\n<div class=\"bottomBtns\">\n      <button (click)=\"pagination('first')\"\n              class=\"btn btn-xs btn-primary\" [disabled]=\"currentPage == 1\">first\n      </button>\n      <button (click)=\"pagination('prev')\"\n              class=\"btn btn-xs btn-primary\" [disabled]=\"currentPage == 1\">previous\n      </button>\n      <div class=\"pageNum\">{{currentPage}}</div>\n      <button (click)=\"pagination('next')\"\n              class=\"btn btn-xs btn-primary\">next\n      </button>\n</div>\n\n  "
    }),
    __metadata("design:paramtypes", [article_service_1.ArticleService,
        router_1.ActivatedRoute,
        router_1.Router])
], ArticleListComponent);
exports.ArticleListComponent = ArticleListComponent;
//# sourceMappingURL=article-list.component.js.map