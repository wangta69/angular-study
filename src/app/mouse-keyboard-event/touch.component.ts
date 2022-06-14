import { Component, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'touch.html',
})
export class TouchComponent implements AfterViewInit{

    public startEv: any;
    public endEv = false;
    public cancelEv: any;
    public moveEv: any;
    constructor(
    ) {
    }

    ngAfterViewInit(){

    }

    public onTouchStart(e: any) {
        this.endEv = false;
        this.startEv = e;
    }

    public onTouchEnd(e: any) {
        this.endEv = true;
    }

    public onTouchCancel(e: any) {
        console.log('onTouchCancel >>', e);
    }

    public onTouchMove(e: any) {
        this.moveEv = e;
    }
}