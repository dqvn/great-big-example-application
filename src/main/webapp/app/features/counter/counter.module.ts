import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { NgJhipsterModule } from 'ng-jhipster';

import { CounterRouting } from './counter.routing';
import { GreatBigExampleApplicationSharedModule } from '../../shared/shared.module';
import { CounterComponent } from './counter.component';
import { CounterPage } from './counter.page';
import { CounterEffects } from '../../core/store/counter/counter.effects';
import { AppTranslationModule } from '../../app.translation.module';
import { SharedLazyModule } from '../../shared/shared-lazy.module';

@NgModule({
    imports: [
        GreatBigExampleApplicationSharedModule,
        ReactiveFormsModule,
        CounterRouting,
        // AppTranslationModule,
        SharedLazyModule,
        // NgJhipsterModule,
        EffectsModule.run(CounterEffects)
    ],
    declarations: [
        CounterPage,
        CounterComponent,
    ]
})
export class CounterModule { }
