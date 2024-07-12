import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FireBaseProvider {

    constructor(
        private fbAuth: AngularFireAuth,
        private fbDb: AngularFireDatabase
    ) {

    }

    async login(email: string, password: string) {
        console.log("Loggin in...");
        const result = await this.fbAuth.signInWithEmailAndPassword(email, password);
        console.log("Login result:", result);
    }

    async addData(tableName: string, data: any) {
        console.log("Adding data...");
        const result = await this.fbDb.list(tableName).push(data);
        console.log("Added data:", result);
    }
}