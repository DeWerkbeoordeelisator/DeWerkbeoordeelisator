import { Component } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { FormsModule } from '@angular/forms';
import { FireBaseProvider } from '../../../providers/firebase.provider';
import { ETable } from '../../enums/table.ebum';

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
export class FillScoreComponent {
    acidity: number = 0;
    feeling: number = 0;

    loading: boolean = false;
    submitFailed: boolean = false;

    constructor(
        private fireBaseProvider: FireBaseProvider
    ) { }

    async sendValues() {
        try {
            this.loading = true;
            const data = {
                acidity: this.acidity,
                feeling: this.feeling
            }
            await this.fireBaseProvider.addData(ETable.WERKBEOORDELING, data);
        } catch (error) {
            console.error(error);
            this.submitFailed = true;
        }
        this.loading = false;
    }
}
