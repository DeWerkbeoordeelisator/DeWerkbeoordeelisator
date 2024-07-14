import { Component } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { FormsModule } from '@angular/forms';

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
}
