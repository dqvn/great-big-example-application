import { TestBed, async } from '@angular/core/testing';

import { TalksPage } from '../../../../../../main/webapp/app/features/talks/talks.page';

describe('TalksPage', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TalksPage
            ],
        }).compileComponents();
    }));

    it('should create the talks page', async(() => {
        const fixture = TestBed.createComponent(TalksPage);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'Talks'`, async(() => {
        const fixture = TestBed.createComponent(TalksPage);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Talks');
    }));

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(TalksPage);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to talks page!!');
    }));
});
