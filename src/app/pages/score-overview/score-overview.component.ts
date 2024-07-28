import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
    selector: 'app-score-overview',
    standalone: true,
    imports: [
        HeaderComponent,
        BaseChartDirective
    ],
    templateUrl: './score-overview.component.html',
    styleUrl: './score-overview.component.scss'
})
export class ScoreOverviewComponent {

    barChartData: ChartData = {
        datasets: []
    };

    barChartOptions: ChartOptions = {
        responsive: true
    };
}
