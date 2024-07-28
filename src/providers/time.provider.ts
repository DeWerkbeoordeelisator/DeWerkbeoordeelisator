import { Injectable } from '@angular/core';
import moment from "moment-timezone";

@Injectable({
    providedIn: 'root'
})
export class TimeProvider {
    private readonly TIMESLOTS: [number, number][] = [
        [800, 1100],
        [1100, 1400],
        [1400, 1700]
    ];

    get timeSlots(): string[] {
        return this.TIMESLOTS.map(([start, end]) => `${start.toString().padStart(4, '0')} - ${end.toString().padStart(4, '0')}`);
    }

    /**
     * Calculates the next available time based on the current time and predefined timeslots.
     */
    get nextAvailableTime(): Date {
        // Get current timestamp
        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours() * 100 + currentDateTime.getMinutes(); // Convert to HHMM format

        // Find next available timeslot
        let nextAvailableTimeslot: [number, number] | undefined;
        for (const timeslot of this.TIMESLOTS) {
            if (currentHour < timeslot[0]) {
                nextAvailableTimeslot = timeslot;
                break;
            }
        }

        // If no next available timeslot found for today, take the first timeslot of the next day
        if (!nextAvailableTimeslot) {
            const tomorrow = new Date(currentDateTime);
            tomorrow.setDate(currentDateTime.getDate() + 1);
            nextAvailableTimeslot = this.TIMESLOTS[0];
        }

        // Calculate next available datetime
        const nextAvailableDateTime = new Date(currentDateTime);
        nextAvailableDateTime.setHours(Math.floor(nextAvailableTimeslot[0] / 100), nextAvailableTimeslot[0] % 100, 0, 0);

        return nextAvailableDateTime;
    }

    /**
     * Check if an action can be performed based on the last action timestamp.
     * @param lastActionTimestamp The timestamp of the last action, or undefined if no previous action exists.
     * @returns True if the action can be performed, false if the action cannot be performed, null if the current time does not fall into any timeslot.
     */
    canPerformAction(lastActionTimestamp: number | undefined): boolean | null {
        // Get current timestamp
        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours() * 100 + currentDateTime.getMinutes(); // Convert to HHMM format

        // Find current timeslot
        const currentTimeslot = this.TIMESLOTS.find(([start, end]) => start <= currentHour && currentHour < end);

        if (!currentTimeslot) {
            return null; // Current time does not fall into any timeslot
        }

        if (lastActionTimestamp === undefined) {
            return true; // No previous action, allow the action
        }

        // Convert last action timestamp to Date object
        const lastActionDateTime = new Date(lastActionTimestamp);

        // Get the date part of current and last action datetime objects
        const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
        const lastActionDate = new Date(lastActionDateTime.getFullYear(), lastActionDateTime.getMonth(), lastActionDateTime.getDate());

        // Check if they are on the same day, if not, allow the action
        if (currentDate.getTime() !== lastActionDate.getTime()) {
            return true;
        }

        // Check if the last action was performed in the current timeslot
        const lastActionHour = lastActionDateTime.getHours() * 100 + lastActionDateTime.getMinutes(); // Convert to HHMM format
        if (currentTimeslot[0] <= lastActionHour && lastActionHour < currentTimeslot[1]) {
            return false;
        }

        return true;
    }

    getTimeSlot(date: Date): string {
        const hour = date.getHours() * 100 + date.getMinutes(); // Convert to HHMM format
        const timeslot = this.TIMESLOTS.find(([start, end]) => start <= hour && hour < end);
        return timeslot ? `${timeslot[0].toString().padStart(4, '0')} - ${timeslot[1].toString().padStart(4, '0')}` : '';
    }

    getTimeSlotIndex(date: Date): number {
        const hour = date.getHours() * 100 + date.getMinutes(); // Convert to HHMM format
        return this.TIMESLOTS.findIndex(([start, end]) => start <= hour && hour < end);
    }

    startOfDateUnix(date: Date): number {
        return moment.tz(date, 'GMT').startOf('day').unix() * 1000;
    }
}
