import { Component } from '@angular/core';
import { ChartTypeRegistry } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-heatmap-scores',
    standalone: true,
    imports: [
        BaseChartDirective
    ],
    templateUrl: './heatmap-scores.component.html',
    styleUrl: './heatmap-scores.component.scss'
})
export class HeatmapScoresComponent {
    public heatmapChartData = [
        { data: [7, 5, 4], label: 'User 1' },
        { data: [6, 3, 4], label: 'User 2' },
    ];
    public heatmapChartLabels = ['0800-1100', '1100-1400', '1400-1700'];
    public heatmapChartOptions = {
        responsive: true
    };
    public heatmapChartColors = [
        {
            backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)']
        }
    ];
    public heatmapChartLegend = true;
    public heatmapChartType: keyof ChartTypeRegistry = 'bar';
}
