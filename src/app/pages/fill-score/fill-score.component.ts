import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { FormsModule } from '@angular/forms';
import { FireBaseProvider } from '../../../providers/firebase.provider';
import { ETable } from '../../enums/table.ebum';
import { ConfettiProvider } from '../../../providers/confetti.provider';

@Component({
    selector: 'app-fill-score',
    standalone: true,
    imports: [
        SliderComponent,
        FormsModule
    ],
    templateUrl: './fill-score.component.html',
    styleUrl: './fill-score.component.scss'
})
export class FillScoreComponent implements OnInit {
    acidity: number = 0;
    feeling: number = 0;

    loading: boolean = false;
    submitFailed: boolean = false;
    submitted: boolean = false;

    email: string = '';

    constructor(
        private fireBaseProvider: FireBaseProvider,
        private confettiProvider: ConfettiProvider
    ) { }

    async ngOnInit(): Promise<void> {
        this.email = (await this.fireBaseProvider.user)?.email ?? '';
    }

    async sendValues() {
        try {
            this.loading = true;
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
        this.loading = false;
    }
}
