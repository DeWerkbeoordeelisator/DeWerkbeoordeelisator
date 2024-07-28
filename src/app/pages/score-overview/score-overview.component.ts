import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { LineChartComponent } from "../../components/line-chart/line-chart.component";
import { ChartDataset } from 'chart.js';

@Component({
    selector: 'app-score-overview',
    standalone: true,
    imports: [
        HeaderComponent,
        LineChartComponent
    ],
    templateUrl: './score-overview.component.html',
    styleUrl: './score-overview.component.scss'
})
export class ScoreOverviewComponent {
    lineChartData: ChartDataset[] = [
        {
            data: [1, 3, 4],
            label: 'Blijheid'
        }
    ];
}
