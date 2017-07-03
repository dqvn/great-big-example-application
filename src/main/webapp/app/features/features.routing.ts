import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeaturesComponent } from './features.component';
import { HomePage } from './home/home.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
    {
        path: 'features',
        component: FeaturesComponent,
        children: [
            { path: '', component: HomePage },
            { path: 'bernie', loadChildren: './bernie/bernie.module#BernieModule' },
            { path: 'books', loadChildren: './books/books.module#BooksModule' },
            { path: 'chat', loadChildren: './chat/chat.module#ChatModule' },
            { path: 'contacts', loadChildren: './contact/contact.module#ContactModule' },
            { path: 'counter', loadChildren: './counter/counter.module#CounterModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'dashboard', component: DashboardPage },
            { path: 'game', loadChildren: './game/game.module#GameModule' },
            { path: 'heroes', loadChildren: './heroes/heroes.module#HeroesModule' },
            { path: 'messages', loadChildren: './messages/messages.module#MessagesModule' },
            { path: 'notes', loadChildren: './notes/notes.module#NotesModule' },
            { path: 'wiki', loadChildren: './wiki/wiki.module#WikiModule' }
        ]
    },
];

@NgModule({
    imports: [
        DashboardModule,
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class FeaturesRouting { }
