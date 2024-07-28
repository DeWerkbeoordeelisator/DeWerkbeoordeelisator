import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, firstValueFrom, map } from 'rxjs';
import { IData } from '../app/interfaces/data.interface';
import { Router } from '@angular/router';
import { TimeProvider } from "./time.provider";
import { ETable } from '../app/enums/fbpath.enum';

@Injectable({
    providedIn: 'root'
})
export class FireBaseProvider {

    get user(): any {
        const user = this.fbAuth.user.pipe(first()).toPromise();
        return user;
    }

    constructor(
        private fbAuth: AngularFireAuth,
        private fbDb: AngularFireDatabase,
        private router: Router,
        private timeProvider: TimeProvider
    ) { }

    async login(email: string, password: string) {
        console.log("Logging in...");
        const result = await this.fbAuth.signInWithEmailAndPassword(email, password);
        console.log("Login result:", result);
    }

    async addData(path: string, data: any) {
        console.log("Adding data...");
        const result = await this.fbDb.list(path).push(data);
        console.log("Added data:", result);
    }

    async getData(path: ETable): Promise<any> {
        return await firstValueFrom(this.fbDb.list<IData>(path, ref =>
            ref
        ).valueChanges());
    }

    async getDataOnDate(path: ETable, unix1: number, unix2: number): Promise<IData[]> {
        return await firstValueFrom(this.fbDb.list<IData>(path, ref =>
            ref.orderByChild("timestamp").startAt(unix1).endAt(unix2)
        ).valueChanges());
    }

    async getRecentValue(path: ETable, email: string): Promise<IData> {
        const query = this.fbDb.list<IData>(path, ref =>
          ref.orderByChild('email')
            .equalTo(email)
            .limitToLast(1)
        ).snapshotChanges().pipe(
          map(actions => actions.map(a => ({
            key: a.payload.key,
            ...a.payload.val() as IData
          })))
        );
    
        const data = await firstValueFrom(query);
        console.log("data:", data);
        return data.length > 0 ? data[0] : null;
      }

    async deleteData(itemPath: string): Promise<any> {
        await this.fbDb.object(itemPath).remove();
    }

    async logout() {
        await this.fbAuth.signOut();
        await this.router.navigate(['/login']);
    }
}
