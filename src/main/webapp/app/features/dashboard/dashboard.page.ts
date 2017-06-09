import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'jhi-dashboard',
    styleUrls: ['./dashboard.page.scss'],
    templateUrl: './dashboard.page.html'
})
export class DashboardPage implements OnDestroy {
    eventSubscriber: Subscription;
    // true here is for using subdirectories, you can also specify regex as third param
    // public pathToImages = require.context('../../../', true, /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i);

    constructor(
        private eventManager: EventManager,
        // private jhiLanguageService: JhiLanguageService
    ) {
        // this.jhiLanguageService.setLocations(['all']);

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }
}
