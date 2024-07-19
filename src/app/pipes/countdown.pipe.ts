import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'countdown',
    standalone: true,
    pure: false
})
export class CountdownPipe implements PipeTransform, OnDestroy {
    private countdownInterval: any;
    private timeLeftMessage: string = '';

    transform(nextAvailableTime: Date): string {
        this.startCountdown(nextAvailableTime);
        return this.timeLeftMessage;
    }

    private startCountdown(nextAvailableTime: Date): void {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }

        this.generateTimeLeftMessage(nextAvailableTime);
        this.countdownInterval = setInterval(() => {
            this.generateTimeLeftMessage(nextAvailableTime);
        }, 1000);
    }

    private generateTimeLeftMessage(nextAvailableTime: Date): void {
        const now = new Date().getTime();
        const difference = nextAvailableTime.getTime() - now;

        if (difference > 0) {
            const timeLeft = this.calculateTimeLeft(difference);
            this.timeLeftMessage = this.formatTimeLeft(timeLeft);
        } else {
            this.timeLeftMessage = '';
            clearInterval(this.countdownInterval);
        }
    }

    private calculateTimeLeft(difference: number): { hours: number, minutes: number, seconds: number } {
        return {
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
    }

    private formatTimeLeft(timeLeft: { hours: number, minutes: number, seconds: number }): string {
        const parts = [];

        if (timeLeft.hours > 0) {
            parts.push(`${timeLeft.hours} uur`);
        }

        if (timeLeft.minutes > 0) {
            parts.push(`${timeLeft.minutes} minute${timeLeft.minutes !== 1 ? 'n' : ''}`);
        }

        if (timeLeft.seconds > 0) {
            parts.push(`${timeLeft.seconds} second${timeLeft.seconds !== 1 ? 'en' : ''}`);
        }

        return `Dat is al over ${parts.join(', ')}!`;
    }

    ngOnDestroy(): void {
        clearInterval(this.countdownInterval);
    }
}
