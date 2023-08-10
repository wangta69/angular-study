import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as GSAP from 'gsap';
@Component({
    selector: 'app-root',
    templateUrl: 'gsap.html',
})
export class GsapComponent implements AfterViewInit{
    @ViewChild('myElement', {static: true}) divRef: ElementRef<HTMLDivElement> = {} as ElementRef;
    constructor(
    ) {
    }

    ngAfterViewInit(){
        GSAP.gsap.to(this.divRef.nativeElement, {
            opacity: 1
        });
        
    }

    public set() {
        const el = document.getElementById('set');
        GSAP.gsap.set(el, {
            x: 100
        });
    }


    public move() {
        const el = document.getElementById('move');
        GSAP.gsap.to(el, {
            x: 100,
            duration: 0.1
        });
    }

    public scale() {
        const el = document.getElementById('scale');
        GSAP.gsap.to(el, {
            scale: 4,
            duration: 1
        });
    }

    public scaleclass() {
        const el = document.getElementsByClassName('scale')[0];
        GSAP.gsap.to(el, {
            scale: 4,
            duration: 1
        });
    }
}