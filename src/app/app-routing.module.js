"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var not_found_component_1 = require("./not-found.component");
var http_1 = require("@angular/http");
var selective_preloading_strategy_1 = require("./selective-preloading-strategy");
var appRoutes = [
    { path: '', redirectTo: '/articles', pathMatch: 'full' },
    { path: '**', component: not_found_component_1.PageNotFoundComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            http_1.HttpModule,
            http_1.JsonpModule,
            router_1.RouterModule.forRoot(appRoutes, { preloadingStrategy: selective_preloading_strategy_1.SelectivePreloadingStrategy })
        ],
        exports: [
            router_1.RouterModule
        ],
        providers: [
            selective_preloading_strategy_1.SelectivePreloadingStrategy
        ]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map