import { Component, OnInit } from "@angular/core";
import { ChartDataset } from "chart.js";
import { TimeProvider } from "../../../providers/time.provider";
import { FireBaseProvider } from "../../../providers/firebase.provider";
import { HeaderComponent } from "../../components/header/header.component";
import { LineChartComponent } from "../../components/line-chart/line-chart.component";
import { ETable } from "../../enums/fbpath.enum";

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
export class ScoreOverviewComponent implements OnInit {
    lineChartData: ChartDataset<"line", number[]>[] = [];

    constructor(
        private fireBaseProvider: FireBaseProvider,
        private timeProvider: TimeProvider
    ) { }

    async ngOnInit(): Promise<void> {
        await this.getTodayAverage();
    }

    async getTodayAverage() {
        try {
            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 1);

            const data = await this.fireBaseProvider.getDataOnDate(
                ETable.WERKBEOORDELING,
                this.timeProvider.startOfDateUnix(startDate),
                this.timeProvider.startOfDateUnix(endDate)
            );

            console.log("data:", data);

            const lineChartData = [
                { data: [0, 0, 0], label: 'Blijheid' },
                { data: [0, 0, 0], label: 'Zuurtegraad' },
                { data: [0, 0, 0], label: 'Zin in werk' },
                { data: [0, 0, 0], label: 'Zin om werk te verzetten' },
                { data: [0, 0, 0], label: 'Verwachting' }
            ];

            const counts = [
                Array(3).fill(0), 
                Array(3).fill(0),
                Array(3).fill(0),
                Array(3).fill(0),
                Array(3).fill(0)
            ];
            data.forEach(item => {
                const timeSlot = this.timeProvider.getTimeSlotIndex(new Date(item.timestamp));

                // Sum the 'feeling' and 'acidity' values into respective time slots
                lineChartData[0].data[timeSlot] += item.feeling;
                lineChartData[1].data[timeSlot] += item.acidity;
                lineChartData[2].data[timeSlot] += item.wantToBeAtWork;
                lineChartData[3].data[timeSlot] += item.toDoWork;
                lineChartData[4].data[timeSlot] += item.expectation;

                // Increment the count for each time slot
                counts[0][timeSlot]++;
                counts[1][timeSlot]++;
                counts[2][timeSlot]++;
                counts[3][timeSlot]++;
                counts[4][timeSlot]++;
            });

            console.log("lineChartData:", lineChartData);
            // Calculate the average for each time slot
            lineChartData.forEach((dataset, index) => {
                dataset.data = dataset.data.map((value, i) => counts[index][i] > 0 ? value / counts[index][i] : 0);
            });

            this.lineChartData = lineChartData;
        } catch (error) {
            console.error("Error: ", error);
        }
    }
}
