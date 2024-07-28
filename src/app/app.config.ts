import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        importProvidersFrom(
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularSvgIconModule.forRoot(),
            HttpClientModule
        ), provideCharts(withDefaultRegisterables())
    ]
};
