import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { GreatBigExampleApplicationSharedModule, UserRouteAccessService } from './shared';
import { GreatBigExampleApplicationHomeModule } from './home/home.module';
import { GreatBigExampleApplicationAdminModule } from './admin/admin.module';
import { GreatBigExampleApplicationAccountModule } from './account/account.module';
import { GreatBigExampleApplicationEntityModule } from './entities/entity.module';
import { StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { TranslateModule, TranslateLoader, TranslateParser, MissingTranslationHandler } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { TranslateHttpLoader, } from '@ngx-translate/http-loader';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { FeaturesModule } from './features/features.module';
import { CoreModule } from './core/core.module';
import { AppConfig } from './app.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here
/** TODO: remove when work-around is not needed*/
import 'hammerjs';

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        GreatBigExampleApplicationSharedModule,
        GreatBigExampleApplicationHomeModule,
        GreatBigExampleApplicationAdminModule,
        GreatBigExampleApplicationAccountModule,
        GreatBigExampleApplicationEntityModule,
        FeaturesModule,
        CoreModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            },
        }),
        StoreLogMonitorModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        AppConfig,
        ProfileService,
        // customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [JhiMainComponent]
})
export class GreatBigExampleApplicationAppModule { }
