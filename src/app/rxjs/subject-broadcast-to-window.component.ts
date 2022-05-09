import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    template:`
        <app-window></app-window>
        <button (click)="up()">up</button>
    `
})
export class BroadCastToWindow{
    private count = 0;
    private countHandler = new Subject<any>();
    constructor(

    ) {
        (window as any).myEvent = {
            count: this.countHandler
        }
    }

    public up() {
        const type = 'countUp';
        this.count++;
        const payload = {count: this.count};
        this.countHandler.next({ type, payload });

    }
}