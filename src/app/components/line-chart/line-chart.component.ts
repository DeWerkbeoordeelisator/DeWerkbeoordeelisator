import { JsonPipe } from '@angular/common';
import { TimeProvider } from './../../../providers/time.provider';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [
        BaseChartDirective,
        JsonPipe
    ],
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnChanges {
    // https://www.chartjs.org/docs/latest/charts/line.html
    @Input() data: ChartDataset<"line", number[]>[] = [];

    constructor(
        private timeProvider: TimeProvider
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        const data = changes["data"];

        console.log("LineChartComponent - Chart data:", data);
        if (data) {
            this.lineChartData = {
                datasets: structuredClone(data.currentValue),
                yLabels: Array.from({ length: 10 }, (_, i) => i.toString()),
                xLabels: this.timeProvider.timeSlots
            };
        }
    }

    lineChartData: ChartData = {
        datasets: this.data,
        yLabels: Array.from({ length: 10 }, (_, i) => i.toString()),
        xLabels: this.timeProvider.timeSlots
    };
    lineChartOptions: ChartOptions = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                },
                min: 0,
                max: 10
            }
        },
        responsive: true
    };
}
