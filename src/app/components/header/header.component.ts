import { Component, OnInit } from '@angular/core';
import { PopperDirective } from '../../directives/popper-directive';
import { SvgIconComponent } from 'angular-svg-icon';
import { FireBaseProvider } from '../../../providers/firebase.provider';

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

    constructor(
        private fireBaseProvider: FireBaseProvider
    ) { }

    async ngOnInit(): Promise<void> {
        this.email = (await this.fireBaseProvider.user)?.email ?? '';
    }

    async logout() {
        await this.fireBaseProvider.logout();
    }
}
