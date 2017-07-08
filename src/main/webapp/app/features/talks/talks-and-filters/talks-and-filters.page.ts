import { Component, Inject } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Filters } from '../talks.layout';
import * as fromRoot from '../../../core/store';
import { Talk } from '../../../core/store/talk/talk.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'jhi-talks-and-filters-page',
    templateUrl: './talks-and-filters.page.html',
    styleUrls: ['./talks-and-filters.page.css']
})
export class TalksAndFiltersPage {
    filters: Observable<Filters>;
    talks: Observable<Talk[]>;

    constructor(private router: Router, store: Store<fromRoot.RootState>) {
        this.filters = store.select('talk', 'filters');
        this.talks = store.select('talk').map(s => s.list.map(n => s.talks[n]));
    }

    handleFiltersChange(filters: Filters): void {
        this.router.navigate(['/talks', this.createParams(filters)]);
    }

    private createParams(filters: Filters): Params {
        const r: any = {};
        if (filters.speaker) r.speaker = filters.speaker;
        if (filters.title) r.title = filters.title;
        if (filters.minRating) r.minRating = filters.minRating;
        return r;
    }
}
