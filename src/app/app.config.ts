import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { environment } from "../environments/environment";
import { AngularFireModule, FIREBASE_OPTIONS } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { provideFirebaseApp } from "@angular/fire/app";
import { initializeApp } from "firebase/app";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
        importProvidersFrom(
            AngularFireModule.initializeApp(environment.firebaseConfig)
        )
    ]
};
