import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ETable } from '../app/enums/table.ebum';
import { first } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FireBaseProvider {

    get user() {
        const user = this.fbAuth.user.pipe(first()).toPromise();
        return user;
    }

    constructor(
        private fbAuth: AngularFireAuth,
        private fbDb: AngularFireDatabase
    ) { }

    async login(email: string, password: string) {
        console.log("Logging in...");
        const result = await this.fbAuth.signInWithEmailAndPassword(email, password);
        console.log("Login result:", result);
    }

    async addData(table: ETable, data: any) {
        console.log("Adding data...");
        const result = await this.fbDb.list(table).push(data);
        console.log("Added data:", result);
    }
}
