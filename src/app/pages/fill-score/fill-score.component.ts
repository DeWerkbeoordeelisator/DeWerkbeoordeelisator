import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { FormsModule } from '@angular/forms';
import { FireBaseProvider } from '../../../providers/firebase.provider';
import { ConfettiProvider } from '../../../providers/confetti.provider';
import { ETable } from '../../enums/table.enum';
import { TimeProvider } from '../../../providers/time.provider';
import { SvgIconComponent } from 'angular-svg-icon';
import { PopperDirective } from '../../directives/popper-directive';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-fill-score',
    standalone: true,
    imports: [
        SliderComponent,
        FormsModule,
        SvgIconComponent,
        PopperDirective,
        DatePipe
    ],
    templateUrl: './fill-score.component.html',
    styleUrl: './fill-score.component.scss'
})
export class FillScoreComponent implements OnInit {
    acidity: number = 0;
    feeling: number = 0;

    loading: string = '';
    submitFailed: boolean = false;
    submitted: boolean = false;
    canPerformAction: boolean | null = false;

    nextAvailableTime: Date = new Date();
    email: string = '';

    constructor(
        private fireBaseProvider: FireBaseProvider,
        private confettiProvider: ConfettiProvider,
        private timeProvider: TimeProvider
    ) { }

    async ngOnInit(): Promise<void> {
        this.email = (await this.fireBaseProvider.user)?.email ?? '';
        this.nextAvailableTime = this.timeProvider.nextAvailableTime;
        await this.checkValues();
    }

    async checkValues() {
        try {
            this.loading = 'We checken of je al een beoordeling hebt ingevuld...';
            const data = await this.fireBaseProvider.getRecentValue(ETable.WERKBEOORDELING, this.email);
            this.canPerformAction = this.timeProvider.canPerformAction(data?.timestamp);
        } catch (error) {
            console.error(error);
        }
        this.loading = '';
    }

    async sendValues() {
        try {
            this.loading = 'We zijn je beoordeling aan het opslaan';
            const data = {
                acidity: this.acidity,
                feeling: this.feeling,
                timestamp: new Date().getTime(),
                email: this.email
            }
            await this.fireBaseProvider.addData(ETable.WERKBEOORDELING, data);

            this.confettiProvider.shoot();

            this.submitted = true;
        } catch (error) {
            console.error(error);
            this.submitFailed = true;
        }
        this.loading = '';
    }

    async logout() {
        await this.fireBaseProvider.logout();
    }
}
