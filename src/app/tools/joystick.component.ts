import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'joystick.html',
})
export class JoystickComponent implements AfterViewInit{
    @ViewChild('stick', {static: false}) stick: ElementRef<HTMLDivElement> = {} as ElementRef;
    private dragStart: any;

    // track touch identifier in case multiple joysticks present
    private touchId = null;

    private active = false;
    public value = { x: 0, y: 0 };
    public direction: string | null = null;

    private maxDistance = 64;
    private deadzone = 8;


    constructor(
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit(){

        // let stick = document.getElementById(stickID);

        // location from which drag begins, used to calculate offsets
        this.dragStart = null;

        // track touch identifier in case multiple joysticks present
        this.touchId = null;

        this.active = false;
        this.value = { x: 0, y: 0 };
    }

    public onTouchStart(e: any) {
        // this.endEv = false;
        // this.startEv = e;
        this.handleDown(e);
    }

    public onTouchEnd(e: any) {
        // this.endEv = true;
        this.handleUp(e);
    }


    public onTouchMove(e: any) {
        // this.moveEv = e;
        this.handleMove(e);
    }


    private handleDown(e: any)
    {
        this.active = true;

        // all drag movements are instantaneous
        // stick.style.transition = '0s';
        this.renderer.setStyle( this.stick.nativeElement, 'transition', '0s');

        // touch e fired before mouse event; prevent redundant mouse event from firing
        e.preventDefault();

        if (e.changedTouches)
            this.dragStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        else
            this.dragStart = { x: e.clientX, y: e.clientY };

        // if this is a touch event, keep track of which one
        if (e.changedTouches)
            this.touchId = e.changedTouches[0].identifier;
    }

    private handleMove(e: any)
    {
        if ( !this.active ) return;

        // if this is a touch event, make sure it is the right one
        // also handle multiple simultaneous touchmove events
        let touchmoveId = null;
        if (e.changedTouches)
        {
            for (let i = 0; i < e.changedTouches.length; i++)
            {
                if (this.touchId == e.changedTouches[i].identifier)
                {
                    touchmoveId = i;
                    e.clientX = e.changedTouches[i].clientX;
                    e.clientY = e.changedTouches[i].clientY;
                }
            }

            if (touchmoveId == null) return;
        }

        const xDiff = e.clientX - this.dragStart.x;
        const yDiff = e.clientY - this.dragStart.y;
        const angle = Math.atan2(yDiff, xDiff);
        const distance = Math.min(this.maxDistance, Math.hypot(xDiff, yDiff));
        const xPosition = distance * Math.cos(angle);
        const yPosition = distance * Math.sin(angle);

        // move stick image to new position
        // stick.style.transform = `translate3d(${xPosition}px, ${yPosition}px, 0px)`;
        this.renderer.setStyle( this.stick.nativeElement, 'transform', `translate3d(${xPosition}px, ${yPosition}px, 0px)`);


        const distance2 = (distance < this.deadzone) ? 0 : this.maxDistance / (this.maxDistance - this.deadzone) * (distance - this.deadzone);
        const xPosition2 = distance2 * Math.cos(angle);
        const yPosition2 = distance2 * Math.sin(angle);
        const xPercent = parseFloat((xPosition2 / this.maxDistance).toFixed(4));
        const yPercent = parseFloat((yPosition2 / this.maxDistance).toFixed(4));

        this.value = { x: xPercent, y: yPercent };

        // 4 way : left, right, up, down 으로 변경
        this.direction = this.dirction4();
        console.log(this.direction);

    }

    private dirction4() {
        // 먼저 절대값중에 큰것을 찾는다.
        const abs_x = (Math.abs(this.value.x));
        const abs_y = (Math.abs(this.value.y));
        if (abs_x > abs_y) {
            if (this.value.x < 0) {
                return 'left';
            } else {
                return 'right';
            }
        } else if (abs_x < abs_y) {
            if (this.value.y < 0) {
                return 'up';
            } else {
                return 'down';
            }
        }

        return null;

    }

    private handleUp(e: any)
    {
        if ( !this.active ) return;

        // if this is a touch event, make sure it is the right one
        if (e.changedTouches && this.touchId != e.changedTouches[0].identifier) return;

        // transition the joystick position back to center
        // stick.style.transition = '.2s';
        // stick.style.transform = `translate3d(0px, 0px, 0px)`;
        this.renderer.setStyle( this.stick.nativeElement, 'transition', '.2s');
        this.renderer.setStyle( this.stick.nativeElement, 'transform', `translate3d(0px, 0px, 0px)`);

        // reset everything
        this.value = { x: 0, y: 0 };
        this.touchId = null;
        this.active = false;
    }
}
