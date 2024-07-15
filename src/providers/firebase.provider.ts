import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, firstValueFrom } from 'rxjs';
import { ETable } from '../app/enums/table.enum';
import { IData } from '../app/interfaces/data.interface';
import { Router } from '@angular/router';

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
        private fbDb: AngularFireDatabase,
        private router: Router
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

    async getRecentValue(table: string, email: string): Promise<IData | null> {
        const query = this.fbDb.list<IData>(table, ref =>
            ref.orderByChild('email')
                .equalTo(email)
                .limitToLast(1)
        ).valueChanges();

        const data = await firstValueFrom(query);
        return data.length > 0 ? data[0] : null;
    }

    async logout() {
        await this.fbAuth.signOut();
        await this.router.navigate(['/login']);
    }
}
