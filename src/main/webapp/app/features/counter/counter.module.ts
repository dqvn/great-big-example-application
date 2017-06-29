import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { CounterRouting } from './counter.routing';
import { GreatBigExampleApplicationSharedModule } from '../../shared/shared.module';
import { CounterComponent } from './counter.component';
import { CounterPage } from './counter.page';
import { CounterEffects } from '../../core/store/counter/counter.effects';
import { AppTranslationModule } from '../../app.translation.module';

@NgModule({
    imports: [
        GreatBigExampleApplicationSharedModule,
        ReactiveFormsModule,
        CounterRouting,
        // AppTranslationModule,
        EffectsModule.run(CounterEffects)
    ],
    declarations: [
        CounterPage,
        CounterComponent,
    ]
})
export class CounterModule { }
