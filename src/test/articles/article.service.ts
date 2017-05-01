import { ArticleService }  from './article.service';

import {
    TestBed, inject
} from '@angular/core/testing';

describe('Markdown transformer service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ArticleService
            ]
        });
    });

    it('Should translate markdown to HTML!',
        inject([ArticleService], (articleService) => {
            expect(articleService.toHtml('hi'))
                .toContain('<p>hi</p>');
        }));

    it('should get articles', async(() => {
        let articleService: ArticleService = getTestBed().get(BlogService);
    }));
});