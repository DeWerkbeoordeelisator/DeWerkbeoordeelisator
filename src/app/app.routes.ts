import { Routes } from '@angular/router';
import { FillScoreComponent } from './pages/fill-score/fill-score.component';
import { LoginComponent } from './pages/login/login.component';
import { NotLoggedIn } from './guards/not-logged-in.guard';
import { LoggedIn } from './guards/logged-in.guard';
import { ScoreOverviewComponent } from './pages/score-overview/score-overview.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [NotLoggedIn]
    },
    {
        path: 'fill-score',
        component: FillScoreComponent,
        pathMatch: 'full',
        canActivate: [LoggedIn]
    },
    {
        path: 'score-overview',
        component: ScoreOverviewComponent,
        pathMatch: 'full',
        canActivate: [LoggedIn]
    },
    {
        path: '**',
        redirectTo: 'fill-score',
        pathMatch: 'full'
    }
];
