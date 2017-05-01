"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Article = (function () {
    function Article(id, title, url, author, created_utc) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.author = author;
        this.created_utc = created_utc;
    }
    return Article;
}());
exports.Article = Article;
var Comment = (function () {
    function Comment(id, body, author, created_utc) {
        this.id = id;
        this.body = body;
        this.author = author;
        this.created_utc = created_utc;
    }
    return Comment;
}());
exports.Comment = Comment;
//# sourceMappingURL=reddit_feed.models.js.map