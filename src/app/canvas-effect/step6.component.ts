import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// https://code.tutsplus.com/articles/21-ridiculously-impressive-html5-canvas-experiments--net-14210
// npm i gsap
import * as GSAP from 'gsap';

@Component({
    selector: 'app-root',
    template:`
    <div id="container" #container>
        <div id="cointainer1" #cointainer1>
            <canvas #canvas1
            (document:mousemove)="onMouseMove($event)">
            </canvas>
        </div>
        <div id="container2" #container2>
            <canvas #canvas2>
            </canvas>
        </div>
    </div>
    `,
    styles: [
        '#container { width: 100vw; height: 100vh; position: relative; float: left; opacity: 0; background-color: black;}',
        '#cointainer1, #container2 { width: 100vw; height: 80vh; position: absolute; top: 0; left: 0;}',
        'canvas {width: 100%; height: 100%; position: absolute; top: 0; left: 0;}'
    ]
})
export class CanvasEffectComponent6 implements AfterViewInit{
    @ViewChild('container', {static: true}) container: ElementRef<HTMLDivElement> = {} as ElementRef;
    @ViewChild('container1', {static: true}) container1: ElementRef<HTMLDivElement> = {} as ElementRef;
    @ViewChild('container2', {static: true}) container2: ElementRef<HTMLDivElement> = {} as ElementRef;
    @ViewChild('canvas1', {static: true}) canvasRef1: ElementRef<HTMLCanvasElement> = {} as ElementRef;
    @ViewChild('canvas2', {static: true}) canvasRef2: ElementRef<HTMLCanvasElement> = {} as ElementRef;
    private canvas1: any;
    private ctx1: any;
    private canvas2: any;
    private ctx2: any;

    // public Particle: any;
    // public Particle2: any;

    public mouseX: any;
    public mouseY: any;
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
        this.ctx2 = this.canvas2.getContext('2d');

        this.style();
        //INITIAL CANVAS DRAW
        this.ctx1.fillStyle = 'rgba(0,0,0,1)';
        this.ctx1.fillRect(0, 0, this.canvas1.width, this.canvas1.height);
        this.ctx2.fillStyle = 'rgba(0,0,0,1)';
        this.ctx2.fillRect(0, 0, this.canvas2.width, this.canvas2.height);


        new particleFactory(this, this.canvas1, this.ctx1);
        new particleFactory(this, this.canvas2, this.ctx2);
    }


    private style() {
        // TweenMax.set(app.container, {
        GSAP.gsap.to(this.container.nativeElement, {
            opacity: 1
        });

        // TweenMax.set(c2Container, {
        console.log(this.container2);
        GSAP.gsap.to(this.container2.nativeElement, {
            transformOrigin: 'center bottom',
            scaleY: -1,
            opacity: 1
        });

        // TweenMax.set(c2, {
        GSAP.gsap.to(this.canvas2, {
            filter: 'blur(10px)'
        });
    }

    public onMouseMove(e: any) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }



}

class particleFactory {

    private particleIndex = 0;
    private particles: any = [];
    private particleNum = 2;
    private particlesLoaded = false;

    public parent: any;
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
                // this.particles.push(new Particle(this, this.particleIndex, this.canvas, this.ctx));
                this.particles[this.particleIndex] = new Particle(this, this.particleIndex, this.canvas, this.ctx);
                this.particleIndex++;
            }
        }
        this.ctx.globalCompositeOperation = 'lighter';
        for (let i in this.particles) {
            // console.log('this.particles >> i >>', i, this.particles[i]);
            this.particles[i].draw();
        }
    }
}


class Particle {
    private id: number;
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
    private opacity: number;

    private gravity: number;

    private hue: number;
    private light: number;
    private color: string;

    private bounced = false;

    private parent: any;
    private canvas: any;
    private ctx: any;

    constructor(
        parent: any, id: number, canvas: any, ctx: any
    ) {
// canvasFunction
        this.parent = parent;
        this.canvas = canvas;
        this.ctx = ctx;
        this.id = id;

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
        this.opacity = 1;
        this.gravity = 1;

        this.hue = this.random(30, 60);
        this.light = this.random(50, 100);
        this.color = `hsla(${this.hue},100%,${this.light}%,${this.opacity})`;

        this.bounced = false;
    }


    public draw () {
        if ((this.r <= 0)) {
            delete this.parent.particles[this.id];
            return;
        }


        if ((!this.originTriggered) && (this.parent.parent.mouseX != null)) {
            this.originTriggered = true;
            this.x = this.parent.parent.mouseX;
            this.y = this.parent.parent.mouseY;
        }
        this.color = `hsla(${this.hue},100%,${this.light}%,${this.opacity})`;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        // console.log(this.x, this.y, this.r);
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();

        //START DRAW OPERATION
        this.r += this.rIncrement;
        this.x += this.vx;
        this.y += this.vy;
        // this.durationCounter++;
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
    }

    private random(min: number, max: number) {
        max = max + 1;
        return Math.floor(Math.random() * (max - min) + min);
    };
}
