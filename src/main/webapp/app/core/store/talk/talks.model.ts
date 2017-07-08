import { Talk } from './talk.model';
import { Filters } from '../../../features/talks/talks.layout';

export interface Talks {
    talks: { [id: number]: Talk },
    list: number[],
    filters: Filters,
    watched: { [id: number]: boolean }
};

export function initialTalks(vals: any = {}): Talks {
    return Object.assign({
        talks: {},
        list: [],
        filters: {
            speaker: null,
            title: null,
            minRating: 0
        },
        watched: {}
    }, vals);
}
