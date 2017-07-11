import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Params, ActivatedRouteSnapshot } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { WatchService } from '../../../features/talks/services/watch.service';
import { Rate, Watch } from './talk.actions';
import { Filters } from '../../../features/talks/talks.layout';
import { BackendService } from '../../../features/talks/services/backend.service';  // TODO: switch to use standard
// import { RESTService } from '../../services/rest.service';
import { Talk } from './talk.model';
import { RootState } from '../';

@Injectable()
export class TalksEffects {
    @Effect() navigateToTalks = this.handleNavigation('talks', (r: ActivatedRouteSnapshot) => {
        const filters = createFilters(r.params);
        return this.backend.findTalks(filters).map(resp => ({ type: 'TALKS_UPDATED', payload: { ...resp, filters } }));
    });

    @Effect() navigateToTalk = this.handleNavigation('talk/:id', (r: ActivatedRouteSnapshot, state: RootState) => {
        const id = +r.paramMap.get('id');
        if (!state.talk[id]) {
            return this.backend.findTalk(+r.paramMap.get('id')).map(resp => ({ type: 'TALK_UPDATED', payload: resp }));
        } else {
            return of();
        }
    });

    @Effect() rateTalk = this.actions$.ofType('RATE').
        switchMap((a: Rate) => {
            return this.backend.rateTalk(a.payload.talkId, a.payload.rating).switchMap(() => of()).catch(e => {
                console.log('Error', e);
                return of({ type: 'UNRATE', payload: { talkId: a.payload.talkId } });
            });
        });

    @Effect() watchTalk = this.actions$.ofType('WATCH').
        map((a: Watch) => {
            this.watch.watch(a.payload.talkId);
            return { type: 'TALK_WATCHED', payload: a.payload };
        });

    constructor(
        private store: Store<RootState>,  // Other effects are Store<Thing>
        private actions$: Actions,
        private backend: BackendService,
        private watch: WatchService
    ) { }

    private handleNavigation(segment: string, callback: (a: ActivatedRouteSnapshot, state: RootState) => Observable<any>) {
        const nav = this.actions$.ofType(ROUTER_NAVIGATION).
            map(firstSegment).
            filter(s => s.routeConfig.path === segment);

        return nav.withLatestFrom(this.store).switchMap(a => callback(a[0], a[1])).catch(e => {
            console.log('Network error', e);
            return of();
        });
    }
}

function firstSegment(r: RouterNavigationAction) {
    return r.payload.routerState.root.firstChild;
}

function createFilters(p: Params): Filters {
    return { speaker: p['speaker'] || null, title: p['title'] || null, minRating: p['minRating'] ? +p['minRating'] : 0 };
}


