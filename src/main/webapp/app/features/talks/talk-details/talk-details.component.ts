import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/mergeMap';
import { WatchService } from "../services/watch.service";
import { Talk } from '../../../core/store/talk/talk.model';
import { RootState } from '../../../core/store';
import { Store } from "@ngrx/store";

@Component({
    selector: 'talk-details-cmp',
    templateUrl: './talk-details.component.html',
    styleUrls: ['./talk-details.component.css']
})
export class TalkDetailsComponent {
    talk: Talk;
    isWatched: boolean;

    constructor(private route: ActivatedRoute, private store: Store<RootState>) {

        store.select('layout').subscribe((layout) => {
            const id = (+route.snapshot.paramMap.get('id'));
            this.isWatched = layout.talksPage.watched[id];
        });

        store.select('talk').subscribe(t => {
            const id = (+route.snapshot.paramMap.get('id'));
            this.talk = t[id];
        });
    }

    handleRate(newRating: number): void {
        this.store.dispatch({
            type: 'RATE',
            payload: {
                talkId: this.talk.id,
                rating: newRating
            }
        });
    }

    handleWatch(): void {
        this.store.dispatch({
            type: 'WATCH',
            payload: {
                talkId: this.talk.id,
            }
        });
    }
}
