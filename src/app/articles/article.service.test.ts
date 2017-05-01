
import { Article, Comment } from './reddit_feed.models';

import { ArticleService }  from './article.service';

import {TestBed, inject, async} from '@angular/core/testing';

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
    let service: ArticleService;

    /*it('Should translate markdown to HTML!',
        inject([ArticleService], (articleService) => {
            expect(articleService.toHtml('hi'))
                .toContain('<p>hi</p>');
        }));*/

    describe('#getArticles', () => {
            let articles = service.getArticles(null, '68q4m3', 2);

        it('should return the articles', () => {
            expect(articles[0]).toEqual(testForms[0]);
            expect(articles[1]).toEqual(testForms[1]);
        });

        it('should return `null` if it does NOT find a form matching the provided ID', () => {
            expect(service.getArticles(null, null, null)).toBeNull();
            expect(service.getArticles(null, 'dfgdfgdf', 23)).toBeNull();
        });
    });

});

