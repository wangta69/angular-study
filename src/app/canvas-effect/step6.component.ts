import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// npm i gsap

import * as anime from 'animejs';
import * as GSAP from 'gsap';

@Component({
    selector: 'app-root',
    template:`
    <canvas #canvas1
    >
        <!--
        (mousedown)="handleEvent($event)" (document:touchstart)="handleEvent($event)" -->
    </canvas>
    <canvas #canvas2>
    </canvas>
    `
})
export class CanvasEffectComponent6 implements AfterViewInit{
    @ViewChild('canvas1', {static: true}) canvasRef1: ElementRef<HTMLCanvasElement> = {} as ElementRef;
    @ViewChild('canvas2', {static: true}) canvasRef2: ElementRef<HTMLCanvasElement> = {} as ElementRef;
    private canvas1: any;
    private ctx1: any;
    private canvas2: any;
    private ctx2: any;

    // private largeHeader!: number;
    private points = [];
    private tickSpeed = 10;
    private base = 180;
    private numPoints = 10;
    private maxTicks = 3000;
    private ticks = 0;

    private particleIndex = 0;
    private particles = {};
    private particleNum = 1;
    private particlesLoaded = false;
    private Particle: any;
    private Particle2: any;


    // this.mouseX: number | null;
    private mouseX: any;
    private mouseY: any;
    constructor(
    ) {
    }

    ngAfterViewInit(){

        this.canvas1 = this.canvasRef1.nativeElement;
        this.canvas1.width = window.innerWidth;
        this.canvas1.height = window.innerHeight;
        this.ctx1 = this.canvas1.getContext('2d');

        this.canvas2 = this.canvasRef2.nativeElement;
        this.canvas2.width = window.innerWidth;
        this.canvas2.height = window.innerHeight;
        this.ctx2 = this.canvas1.getContext('2d');

        this.cacheDOM();
        this.style();

            // c = document.getElementById('c'),
            // c2Container = $('#c2-container'),
            // c2 = document.getElementById('c2'),




        //
        // c.width = $('#c').outerWidth();
        // c.height = $('#c').outerHeight();
        //
        // c2.width = $('#c2').outerWidth();
        // c2.height = $('#c2').outerHeight();

        //INITIAL CANVAS DRAW
        this.ctx1.fillStyle = 'rgba(0,0,0,1)';
        this.ctx1.fillRect(0, 0, this.canvas1.width, this.canvas1.height);
        this.ctx2.fillStyle = 'rgba(0,0,0,1)';
        this.ctx2.fillRect(0, 0, this.canvas2.width, this.canvas2.height);


        this.Particle = new particleFactory(this, this.canvas1, this.ctx1);
        this.Particle2 = new particleFactory(this, this.canvas2, this.ctx2);

        // TweenMax.set(c2Container, {
        //     transformOrigin: 'center bottom',
        //     scaleY: -1,
        //     opacity: 1
        // });
        //
        // TweenMax.set(c2, {
        //     filter: 'blur(10px)'
        // });

    }


    private raf(entry: any) {
        window.requestAnimationFrame(entry);
    };



    private cacheDOM () {
        // this.container = $('#container');
        // this.images = $('img');

        this.mouseX = null;
        this.mouseY = null;
    }
    private style() {
        // this.images.imagesLoaded(function () {
        //     $(window).resize(function initial() {
        //         TweenMax.set(app.container, {
        //             opacity: 1
        //         });
        //         return initial;
        //     }());
        // });
    }
    private cursorEvents(e: any) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }



}

class particleFactory {

    private particleIndex = 0;
    private particles: any = [];
    private particleNum = 2;
    private particlesLoaded = false;


    // private r = 8;
    // private rStart: number;
    // private rIncrement: number;
    // private x: number;
    // private y: number;
    //
    // private vxIsNegative: number;
    //
    // private originTriggered = false;
    // private vx: number;
    // private vxMult: number;
    // private vy: number;
    // private vyMult: number;
    // private opacityLimit: number;
    // private opacity: number;
    // private opacityIncrement: number;
    // private opacityReversing = false;
    // private gravity: number;
    // private framerate: number;
    // private framerateCounter: number;
    // private counter: number;
    //
    // private id: number;
    // private life: number;
    // private maxLife: number;
    // private hue: number;
    // private light: number;
    // private color: string;
    //
    // private bounced = false;
    //
    // private duration = 60;
    // private durationTotal: number;
    // private durationCounter = 0;



    private parent: any;
    private canvas: any;
    private ctx: any;

    constructor(
        parent: any, canvas: any, ctx: any
    ) {
// canvasFunction
        this.parent = parent;
        this.canvas = canvas;
        this.ctx = ctx;

        setInterval(() => {this.draw()}, 15);
    }


    private draw() {
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.particlesLoaded) {
            for (var i = 0; i < this.particleNum; i++) {
                this.particles.push(new Particle(this.parent, this.canvas, this.ctx));
            }
        }
        this.ctx.globalCompositeOperation = 'lighter';
        for (let i in this.particles) {
            this.particles[i].draw();
        }
    }

    private random(min: number, max: number) {
        max = max + 1;
        return Math.floor(Math.random() * (max - min) + min);
    };

}


class Particle {
    private r = 8;
    private rStart: number;
    private rIncrement: number;
    private x: number;
    private y: number;

    private vxIsNegative: number;

    private originTriggered = false;
    private vx: number;
    private vxMult: number;
    private vy: number;
    private vyMult: number;
    private opacityLimit: number;
    private opacity: number;
    private opacityIncrement: number;
    private opacityReversing = false;
    private gravity: number;
    private framerate: number;
    private framerateCounter: number;
    private counter: number;

    // private id: number;
    private life: number;
    private maxLife: number;
    private hue: number;
    private light: number;
    private color: string;

    private bounced = false;

    private duration = 60;
    private durationTotal: number;
    private durationCounter = 0;



    private parent: any;
    private canvas: any;
    private ctx: any;

    constructor(
        parent: any, canvas: any, ctx: any
    ) {
// canvasFunction
        this.parent = parent;
        this.canvas = canvas;
        this.ctx = ctx;

        this.r = 8;
        this.rStart = this.r;
        this.rIncrement = this.r * -0.01;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;

        this.vxIsNegative = this.random(1,2);

        this.originTriggered = false;
        this.vx = this.vxIsNegative === 1 ? this.random(0,50) * -0.1 : this.random(0,50) * 0.1;
        this.vxMult = this.random(10,20) * 0.1;
        this.vy = this.random(-10, 10);
        this.vyMult = this.random(2,6) * -0.1;
        this.opacityLimit = 1;
        this.opacity = 1;
        this.opacityIncrement = 0.05;
        this.opacityReversing = false;
        this.gravity = 1;
        this.framerate = 0;
        this.framerateCounter = this.framerate;
        this.counter = 0;
        // particleIndex++;
        // particles[particleIndex] = this;
        // this.id = particleIndex;

        this.life = 0;
        this.maxLife = this.random(0, 100);
        this.hue = this.random(30, 60);
        this.light = this.random(50, 100);
        this.color = `hsla(${this.hue},100%,${this.light}%,${this.opacity})`;

        this.bounced = false;

        this.duration = 60;
        this.durationTotal = this.duration + this.opacityLimit * 10;
        this.durationCounter = 0;

        setInterval(() => {this.draw()}, 15);
    }



    private draw () {

        if ((!this.originTriggered) && (this.parent.mouseX != null)) {
            this.originTriggered = true;
            this.x = this.parent.mouseX;
            this.y = this.parent.mouseY;
        }
        this.color = `hsla(${this.hue},100%,${this.light}%,${this.opacity})`;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();

        //START DRAW OPERATION
        this.r += this.rIncrement;
        this.x += this.vx;
        this.y += this.vy;
        this.durationCounter++;
        if (this.vx === 0) {
            this.vx++;
        }
        if (this.vxIsNegative === 1) {
            this.vx
        }
        if (this.vy === 0) {
            this.vy++;
        }
        if (this.y > this.canvas.height - this.rStart) {
            if (!this.bounced) {
              this.vx *= this.vxMult;
            } else {
              this.vx *= 0.9;
            }
            this.bounced = true;
            this.vy *= this.vyMult;
            this.y = this.canvas.height - this.rStart;
        }
        this.vy += this.gravity;
        // if ((this.r <= 0)) {
        //     delete particles[this.id];
        // }
        this.life++;
        //END DRAW OPERATION
    }



    private random(min: number, max: number) {
        max = max + 1;
        return Math.floor(Math.random() * (max - min) + min);
    };

}
