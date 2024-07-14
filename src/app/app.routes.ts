import { Routes } from '@angular/router';
import { FillScoreComponent } from './pages/fill-score/fill-score.component';

export const routes: Routes = [
    {
        path: 'fill-score',
        component: FillScoreComponent,
        pathMatch: 'full',
        canActivate: [] // TODO: Make a guard for login
    },
    {
        path: '**',
        redirectTo: 'fill-score',
        pathMatch: 'full'
    }
];
