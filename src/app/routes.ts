import { Routes } from '@angular/router';
import { BASE, BOOKS, FEED } from './constants/routes.const';
import { FeedComponent } from './components/feed/feed.component';
import { provideHttpClient, withInterceptors, withRequestsMadeViaParent } from "@angular/common/http";
import { Authorization } from "./interceptors/interceptors";
import { BookApiService } from "./features/book/services/book-api.service";
import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";

export const APP_ROUTES: Routes = [
    {
        path: BASE,
        redirectTo: `/${FEED}`,
        pathMatch: 'full',
    },
    {
        path: FEED,
        component: FeedComponent,
    },
    {
        path: BOOKS,
        loadChildren: () => import('./features/book/routes')
            .then(m => m.BOOK_ROUTES),
        providers: [
            BookApiService,
            provideHttpClient(
                withRequestsMadeViaParent(),
                withInterceptors([ Authorization ])
            ),
        ],
        canActivate: [ () => inject(AuthService).isAuthenticated() ]
    },
];
