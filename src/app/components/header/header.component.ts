import { Component, OnInit } from '@angular/core';
import { PopperDirective } from '../../directives/popper-directive';
import { SvgIconComponent } from 'angular-svg-icon';
import { FireBaseProvider } from '../../../providers/firebase.provider';
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        PopperDirective,
        SvgIconComponent
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    email: string = '';
    currentUrl: string = null;

    constructor(
        private fireBaseProvider: FireBaseProvider,
        private router: Router
    ) { }

    async ngOnInit(): Promise<void> {
        this.currentUrl = this.router.url;
        this.email = (await this.fireBaseProvider.user)?.email ?? '';
    }

    async logout() {
        await this.fireBaseProvider.logout();
    }

    navigateTo(path: string) {
        this.router.navigate([path]);
    }
}
