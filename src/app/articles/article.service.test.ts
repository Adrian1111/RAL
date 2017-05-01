
import { Article, Comment } from './reddit_feed.models';

import { ArticleService }  from './article.service';

import {TestBed} from '@angular/core/testing';

describe('Markdown articles service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ArticleService
            ]
        });
    });

    const testForms: Array<Article> = [
        {
            author: 'Newshound88',
            created_utc: '1493702317',
            id: '68otr2',
            title: 'Valedictorian’s mom has cancer so school holds graduation early',
            url: 'http://www.greatfallstribune.com/story/news/' +
            '2017/05/01/valedictorians-mom-cancer-school-holds-graduation-early/101156294/',
        },
        {
            author: 'PCisLame',
            created_utc: '1493695042',
            id: '68o259',
            title: 'Trump Weighs Breaking Up Wall Street Banks, Raising U.S. Gas Tax',
            url: 'https://www.bloomberg.com/politics/articles/2017-05-01/trump-says-he-s-considering-moves-to-break-up-wall-street-banks',
        }
    ];
    const testComment: Array<Comment> = [
        {
            author: 'Kevhe4',
            body: 'The teacher is one of the most genuinely nice person I\'ve ever met. He would tell us stories'
            + ' about how he would try to buy'
            + ' brown pants and they\'d be light green. It was actually our'
            + ' freshman class that decided to raise money for him but past students'
            + ' from all grades helped pay for it. He told us the day after he got them he just walked around the grocery'
            + ' store looking at everything for hours.',
            created_utc: '1493758599',
            id: 'dh0zr8h',
        }
    ];
    let service: ArticleService;

    describe('#getArticles', () => {
            let articles = service.getArticles(null, '68q4m3', 2);

        it('should return the articles with known properties', () => {
            expect(articles[0].id).toEqual(testForms[0].id);
            expect(articles[1].author).toEqual(testForms[1].author);
        });

        it('should return `null`', () => {
            expect(service.getArticles(null, null, null)).toBeNull();
            expect(service.getArticles(null, 'dfgdfgdf', 23)).toBeNull();
        });
    });

    describe('#getArticle', () => {
        let article = service.getArticle('68otr2');

        it('should return the article with known properties', () => {
            expect(article[0].created_utc).toEqual(testForms[0].created_utc);
            expect(article[0].author).toEqual(testForms[0].author);
        });

        it('should return `null`', () => {
            expect(service.getArticle('2323232')).toBeNull();
            expect(service.getArticle('fghfghfg')).toBeNull();
        });
    });

    describe('#getComments', () => {
        let comment = service.getComments('68sxgj');

        it('should return comments with known properties', () => {
            expect(comment[0].created_utc).toEqual(testComment[0].created_utc);
            expect(comment[0].author).toEqual(testComment[0].author);
        });

        it('should return `null`', () => {
            expect(service.getComments('2323232')).toBeNull();
            expect(service.getComments('fghfghfg')).toBeNull();
        });
    });

});

