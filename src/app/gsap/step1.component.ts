import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as GSAP from 'gsap';
@Component({
    selector: 'app-root',
    templateUrl: 'gsap.html',
})
export class GsapComponent implements AfterViewInit{
    // private trailCB: any;

    constructor(
    ) {
    }

    ngAfterViewInit(){


    }

    public set() {
        // const el = document.getElementsByClassName('color-fill');
        const el = document.getElementById('set');
        GSAP.gsap.set(el, {
            x: 100,
            duration: 0.1
        });
    }


    public move() {
        // const el = document.getElementsByClassName('color-fill');
        const el = document.getElementById('move');
        GSAP.gsap.to(el, {
            x: 100,
            duration: 0.1
        });
    }

    public scale() {
        // const el = document.getElementsByClassName('color-fill');
        const el = document.getElementById('scale');
        GSAP.gsap.to(el, {
            scale: 4,
            duration: 0.01
        });
    }

    public scaleclass() {
        const el = document.getElementsByClassName('scale')[0];
        GSAP.gsap.to(el, {
            scale: 4,
            duration: 0.01
        });
    }
}