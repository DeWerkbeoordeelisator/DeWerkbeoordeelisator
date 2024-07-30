import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { FormsModule } from '@angular/forms';
import { FireBaseProvider } from '../../../providers/firebase.provider';
import { ConfettiProvider } from '../../../providers/confetti.provider';
import { TimeProvider } from '../../../providers/time.provider';
import { DatePipe } from '@angular/common';
import { CountdownPipe } from '../../pipes/countdown.pipe';
import { HeaderComponent } from '../../components/header/header.component';
import { ETable } from '../../enums/fbpath.enum';

@Component({
    selector: 'app-fill-score',
    standalone: true,
    imports: [
        SliderComponent,
        FormsModule,
        DatePipe,
        CountdownPipe,
        HeaderComponent
    ],
    templateUrl: './fill-score.component.html',
    styleUrl: './fill-score.component.scss'
})
export class FillScoreComponent implements OnInit {
    acidity: number = 0;
    feeling: number = 0;
    wantToBeAtWork: number = 0;
    toDoWork: number = 0;
    expectation: number = 0;

    loading: string = '';
    submitFailed: boolean = false;
    submitted: boolean = false;
    canPerformAction: boolean | null = false;

    nextAvailableTime: Date = new Date();
    email: string = '';
    lastSavedKey = null;

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

            this.lastSavedKey = data?.key;
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
                wantToBeAtWork: this.wantToBeAtWork,
                toDoWork: this.toDoWork,
                expectation: this.expectation,
                timestamp: new Date().getTime(),
                email: this.email
            }
            await this.fireBaseProvider.addData(ETable.WERKBEOORDELING, data);

            this.confettiProvider.shoot();

            this.submitted = true;

            await this.checkValues();
        } catch (error) {
            console.error(error);
            this.submitFailed = true;
        }
        this.loading = '';
    }

    async deleteRecentValue() {
        try {
            await this.fireBaseProvider.deleteData(`${ETable.WERKBEOORDELING}/${this.lastSavedKey}`);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
}
