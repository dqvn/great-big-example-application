import { RouterAction } from '@ngrx/router-store';

import { Talk } from './talk.model';
import * as fromRoot from '../';
import { Filters } from '../../../features/talks/talks.layout';

// actions
export type TalksUpdated = { type: 'TALKS_UPDATED', payload: { talks: { [id: number]: Talk }, list: number[] }, filters: Filters };
export type TalkUpdated = { type: 'TALK_UPDATED', payload: Talk };
export type Watch = { type: 'WATCH', payload: { talkId: number } };
export type TalkWatched = { type: 'TALK_WATCHED', payload: { talkId: number } };
export type Rate = { type: 'RATE', payload: { talkId: number, rating: number } };
export type Unrate = { type: 'UNRATE', payload: { talkId: number, error: any } };
type Action = RouterAction<fromRoot.RootState> | TalksUpdated | TalkUpdated | Watch | TalkWatched | Rate | Unrate;
