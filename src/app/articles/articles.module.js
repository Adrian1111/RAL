"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var article_list_component_1 = require("./article-list.component");
var article_detail_component_1 = require("./article-detail.component");
var article_service_1 = require("./article.service");
var articles_routing_module_1 = require("./articles-routing.module");
var ArticlesModule = (function () {
    function ArticlesModule() {
    }
    return ArticlesModule;
}());
ArticlesModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            articles_routing_module_1.ArticleRoutingModule
        ],
        declarations: [
            article_list_component_1.ArticleListComponent,
            article_detail_component_1.ArticleDetailComponent
        ],
        providers: [article_service_1.ArticleService]
    })
], ArticlesModule);
exports.ArticlesModule = ArticlesModule;
//# sourceMappingURL=articles.module.js.map