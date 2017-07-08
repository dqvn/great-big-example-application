import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { RouterStateSnapshot, Params } from '@angular/router';
import { RouterAction } from '@ngrx/router-store';

import * as fromRoot from '../';
import { typeFor, slices } from '../util';
import { Entities, initialEntities } from '../entity/entity.model';
import { Talk } from './talk.model';
import { Talks, initialTalks } from './talks.model';
import { Filters } from '../../../features/talks/talks.layout';
import { TalksUpdated, TalkUpdated, Watch, TalkWatched, Rate, Unrate } from './talk.actions';

type Action = RouterAction<fromRoot.RootState> | TalksUpdated | TalkUpdated | Watch | TalkWatched | Rate | Unrate;

export function reducer(state: Entities<Talk>, action: Action): Entities<Talk> {
    switch (action.type) {
        case 'TALKS_UPDATED': {
            return { ...state, ...action.payload };
        }
        case 'TALK_UPDATED': {
            const talks = { ...state.entities };
            talks[action.payload.id] = action.payload;
            return { ...state, talks };
        }
        case 'RATE': {
            const talks = { ...state.entities };
            talks[action.payload.talkId].rating = action.payload.rating;
            return { ...state, talks };
        }
        case 'UNRATE': {
            const talks = { ...state.entities };
            talks[action.payload.talkId].rating = null;
            return { ...state, talks };
        }
        default: {
            return state;
        }
    }
}

// export function makeReducer(backend: TalkBackendService, watch: TalkWatchService, store: Store<fromRoot.RootState>) {
//     return (state: Talks = initialTalks({}), action: Action): Talks | Observable<Talks> => {
//         switch (action.type) {
//             case 'ROUTER_NAVIGATION':
//                 const route = action.state.root.firstChild.firstChild;

//                 if (route.routeConfig.path === 'talks') {
//                     const filters = createFilters(route.params);
//                     return backend.findTalks(filters).map(r => ({ ...state, ...r, filters }));

//                 } else if (route.routeConfig.path === 'talk/:id') {
//                     const id = +route.params['id'];
//                     if (state.talks[id]) return state;
//                     return backend.findTalk(id).map(t => ({ ...state, talks: { ...state.talks, [t.id]: t } }));

//                 } else {
//                     return state;
//                 }

//             case 'WATCH':
//                 const talkToWatch = state.talks[action.talkId];
//                 watch.watch(talkToWatch);
//                 const updatedWatched = { ...state.watched, [action.talkId]: true };
//                 return { ...state, watched: updatedWatched };

//             case 'RATE':
//                 backend.rateTalk(action.talkId, action.rating).catch(e => {
//                     store.dispatch({
//                         type: 'UNRATE',
//                         payload: {
//                             talkId: action.talkId,
//                             error: e
//                         }
//                     });
//                     return new Subject<boolean>();
//                 }
//                 ).forEach(() => { });

//                 const talkToRate = state.talks[action.talkId];
//                 const ratedTalk = { ...talkToRate, yourRating: action.rating };
//                 const updatedTalks = { ...state.talks, [action.talkId]: ratedTalk };
//                 return { ...state, talks: updatedTalks };

//             case 'UNRATE':
//                 const talkToUnrate = state.talks[action.talkId];
//                 const unratedTalk = { ...talkToUnrate, yourRating: null };
//                 const updatedTalksAfterUnrating = { ...state.talks, [action.talkId]: unratedTalk };
//                 return { ...state, talks: updatedTalksAfterUnrating };

//             default:
//                 return state;
//         }
//     }
// }

// function createFilters(p: Params): Filters {
//     return { speaker: p['speaker'] || null, title: p['title'] || null, minRating: p['minRating'] ? +p['minRating'] : 0 };
// }

export const getTalks = (state: Talks) => state.talks;

export const getFilteredTalks = (state: Talks) => {
    return state.list.map(n => state.talks[n]);
}
