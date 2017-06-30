import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FeaturesRouting } from './features.routing';
import { FeaturesService } from './features.service';
import { CoreModule } from '../core/core.module';
import { AppTranslationModule } from '../app.translation.module';
import { FeaturesComponent } from './features.component';
import { HomePage } from './home/home.page';
import { VersionService } from '../shared/index';

@NgModule({
    declarations: [
        FeaturesComponent,
        HomePage,
    ],
    imports: [
        // HttpModule,
        // CoreModule,
        CommonModule,
        FeaturesRouting,
        AppTranslationModule,
        MaterialModule,
        FlexLayoutModule
    ],
    providers: [
        VersionService,
        FeaturesService
        // SocketService,
        // AuthGuard
    ]
})

export class FeaturesModule {
    constructor() { }
}
