import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        TranslateModule.forChild({}),
    ],
    exports: [
        CommonModule,
        TranslateModule
    ]
})
export class SharedLazyModule { }
