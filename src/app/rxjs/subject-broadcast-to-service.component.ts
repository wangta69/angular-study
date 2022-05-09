import { Component } from '@angular/core';
import { EventService } from './event.service';

@Component({
    selector: 'app-root',
    template:`
        <app-sub></app-sub>
        <button (click)="up()">up</button>
    `
})
export class BroadCastToService{
    private count = 0;
    constructor(
        private eventSvc: EventService
    ) {

    }

    public up() {
        const type = 'countUp';
        this.count++;
        const payload = {count: this.count};
        this.eventSvc.broadcast(type, payload);
    }
}