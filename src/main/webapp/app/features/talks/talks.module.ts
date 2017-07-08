import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule, MdInputModule, MdCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";

import { TalksPage } from './talks.page';
import { WatchButtonComponent } from './watch-button/watch-button.component';
import { TalksAndFiltersPage } from './talks-and-filters/talks-and-filters.page';
import { TalksComponent } from './talks.component';
import { TalkDetailsComponent } from './talk-details/talk-details.component';
import { TalkComponent } from './talk/talk.component';
import { RateButtonComponent } from './rate-button/rate-button.component';
import { FormatRatingPipe } from './format-rating/format-rating.pipe';
import { FiltersComponent } from './filters/filters.component';
import { WatchService } from "./services/watch.service";
import { TalksEffects } from '../../core/store/talk/talk.effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { TalksRouting } from './talks.routing';

@NgModule({
    declarations: [
        TalksPage,
        WatchButtonComponent,
        TalksAndFiltersPage,
        TalksComponent,
        TalkDetailsComponent,
        TalkComponent,
        RateButtonComponent,
        FormatRatingPipe,
        FiltersComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        NoopAnimationsModule,

        MaterialModule,
        MdInputModule,
        MdCheckboxModule,

        TalksRouting,

        EffectsModule.forRoot([
            TalksEffects
        ]),

        StoreRouterConnectingModule
    ],
    providers: [
        WatchService,
        TalksEffects
    ]
})
export class TalksModule { }
