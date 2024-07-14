import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-slider',
    standalone: true,
    imports: [
        FormsModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SliderComponent),
            multi: true
        }
    ],
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.scss'
})
export class SliderComponent implements ControlValueAccessor {
    @Input() reverse: boolean = false;

    onChange: any = () => {};
    onTouched: any = () => {};

    sliderValue: number = 0;
    maxValue: number = 10;

    get value(): number {
        return this.reverse ? this.maxValue - this.sliderValue : this.sliderValue;
    }

    get sliderLabels(): number[] {
        return Array.from({ length: this.maxValue + 1 }, (_, i) => i);
    }

    writeValue(value: number): void {
        this.sliderValue = this.reverse ? this.maxValue - value : value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.sliderValue = input.value ? parseInt(input.value, 10) : 0;
        this.onChange(this.value);
    }
}
