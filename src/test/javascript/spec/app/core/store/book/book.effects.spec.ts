import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';
import { BookEffects, SEARCH_SCHEDULER, SEARCH_DEBOUNCE } from '../../../../../../../main/webapp/app/core/store/book/book.effects';
import { GoogleBooksService } from '../../../../../../../main/webapp/app/features/books/services/google-books.service';
import { Book } from '../../../../../../../main/webapp/app/core/store/book/book.model';
import * as idActions from '../../../../../../../main/webapp/app/core/store/id/id.actions';
import { slices } from '../../../../../../../main/webapp/app/core/store/util';

export class TestActions extends Actions {
    constructor() {
        super(empty());
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}

describe('BookEffects', () => {
    let effects: BookEffects;
    let googleBooksService: GoogleBooksService;
    let actions$: TestActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BookEffects,
                { provide: GoogleBooksService, useValue: jasmine.createSpyObj('GoogleBooksService', ['searchBooks']) },
                { provide: Actions, useFactory: getActions },
                { provide: SEARCH_SCHEDULER, useFactory: getTestScheduler },
                { provide: SEARCH_DEBOUNCE, useValue: 30 },
            ]
        });

        effects = TestBed.get(BookEffects);
        googleBooksService = TestBed.get(GoogleBooksService);
        actions$ = TestBed.get(Actions);
    });

    describe('search$', () => {
        it('should return a new idActions.LoadSuccess, with the books, on success, after the de-bounce', () => {
            const book1 = { id: '111', volumeInfo: {} } as Book;
            const book2 = { id: '222', volumeInfo: {} } as Book;
            const books = [book1, book2];
            const action = new idActions.Load(slices.BOOK, 'query');
            const completion = new idActions.LoadSuccess(slices.BOOK, books);

            actions$.stream = hot('-a---', { a: action });
            const response = cold('-a|', { a: books });
            const expected = cold('-----b', { b: completion });
            googleBooksService.searchBooks.and.returnValue(response);

            expect(effects.search$).toBeObservable(expected);
        });

        it('should return a new idActions.LoadSuccess, with an empty array, if the books service throws', (() => {
            const action = new idActions.Load(slices.BOOK, 'query');
            const completion = new idActions.LoadSuccess(slices.BOOK, []);
            const error = 'Error!';

            actions$.stream = hot('-a---', { a: action });
            const response = cold('-#|', {}, error);
            const expected = cold('-----b', { b: completion });
            googleBooksService.searchBooks.and.returnValue(response);

            expect(effects.search$).toBeObservable(expected);
        }));

        it(`should not do anything if the query is an empty string`, fakeAsync(() => {
            const action = new idActions.Load(slices.BOOK, '');

            actions$.stream = hot('-a---', { a: action });
            const expected = cold('---');

            expect(effects.search$).toBeObservable(expected);
        }));
    });
});
