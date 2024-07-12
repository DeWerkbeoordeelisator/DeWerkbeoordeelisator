import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FireBaseProvider } from "../providers/firebase.provider";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    constructor(
        private firebaseProvider: FireBaseProvider
    ) {

    }

    login() {
        const email = "daniel@werkbeoordeelisator.nl";
        const password = "frikandelbroodje"
        this.firebaseProvider.login(email, password);
    }

    addData() {
        const tableName = "werkbeoordeling";
        const data = {
            phWaarde: 5,
            frikandelbroodjesInJeReet: 4
        }
        this.firebaseProvider.addData(tableName, data);
    }
}
