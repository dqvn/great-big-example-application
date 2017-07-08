import { Talk } from '../../core/store/talk/talk.model';

export type Filters = { speaker: string, title: string, minRating: number };
export type TalksPageLayout = { talks: { [id: number]: Talk }, list: number[], filters: Filters, watched: { [id: number]: boolean } };
export const initialTalksPageLayout: TalksPageLayout = {
    talks: null,
    list: [],
    filters: {
        speaker: null,
        title: null,
        minRating: 0
    },
    watched: null
};

