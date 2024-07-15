import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
    providedIn: 'root'
})
export class ConfettiProvider {

    shoot() {
        confetti({
            particleCount: 500,
            spread: 250,
            scalar: 2,
            colors: ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093', '#FF7F50', '#FF6EB4', '#FF00FF', '#FF6347', '#FFD700']
        });
    }
}
