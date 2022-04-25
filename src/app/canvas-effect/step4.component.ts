import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// https://code.tutsplus.com/articles/21-ridiculously-impressive-html5-canvas-experiments--net-14210

// npm i gsap

import * as GSAP from 'gsap';
@Component({
    selector: 'app-root',
    template:`
    <div style="background-image: url('https://www.marcoguglie.it/Codepen/AnimatedHeaderBg/demo-1/img/demo-1-bg.jpg');">
    <canvas #canvasId
    (document:mousemove)="onMouseMove($event)"
    >
    </canvas>
    </div>`
})
export class CanvasEffectComponent4 implements AfterViewInit{
    @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;
    private canvas: any;
    private ctx: any;

    private width!: number;
    private height!: number;
    // private largeHeader!: number;
    private points: any = [];
    private target: any;
    private animateHeader = true;


    constructor(
    ) {
    }

    ngAfterViewInit(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.target = {x: this.width / 2, y: this.height / 2};

        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        // Main
        this.initHeader();
        this.initAnimation();
        this.addListeners();
    }

    private initHeader() {
        // create points
        this.points = [];
        for(let x = 0; x < this.width; x = x + this.width/20) {
            for(let y = 0; y < this.height; y = y + this.height/20) {
                let px = x + Math.random()*this.width/20;
                let py = y + Math.random()*this.height/20;
                let p = {x: px, originX: px, y: py, originY: py };
                this.points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(let i = 0; i < this.points.length; i++) {
            let closest = [];
            let p1 = this.points[i];
            for(let j = 0; j < this.points.length; j++) {
                let p2 = this.points[j]
                if(!(p1 == p2)) {
                    let placed = false;
                    for(let k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(let k = 0; k < 5; k++) {
                        if(!placed) {
                            if(this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(let i in this.points) {
            const c = new Circle(
                this,
                this.points[i],
                2 + Math.random() * 2,
                'rgba(255,255,255,0.3)'
            );
            this.points[i].circle = c;
        }
    }

    // Event handling
    private addListeners() {
        // if(!('ontouchstart' in window)) {
        //     window.addEventListener('mousemove', mouseMove);
        // }
        // window.addEventListener('scroll', scrollCheck);
        // window.addEventListener('resize', resize);
    }

    public onMouseMove(e: any) {
        let posx = 0;
        let posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        this.target.x = posx;
        this.target.y = posy;
    }

    private scrollCheck() {
        // if(document.body.scrollTop > this.height) animateHeader = false;
        // else animateHeader = true;
    }

    private resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        //  largeHeader.style.height = height+'px';
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    // animation
    private initAnimation() {
        this.animate();
        for(let i in this.points) {
            this.shiftPoint(this.points[i]);
        }
    }

    private animate() {

        if(this.animateHeader) {
            this.ctx.clearRect(0,0,this.width,this.height);
            for(let i in this.points) {
                // detect points in range
                if(Math.abs(this.getDistance(this.target, this.points[i])) < 4000) {
                    this.points[i].active = 0.3;
                    this.points[i].circle.active = 0.6;
                } else if(Math.abs(this.getDistance(this.target, this.points[i])) < 20000) {
                    this.points[i].active = 0.1;
                    this.points[i].circle.active = 0.3;
                } else if(Math.abs(this.getDistance(this.target, this.points[i])) < 40000) {
                    this.points[i].active = 0.02;
                    this.points[i].circle.active = 0.1;
                } else {
                    this.points[i].active = 0;
                    this.points[i].circle.active = 0;
                }

                this.drawLines(this.points[i]);
                this.points[i].circle.draw();
            }
        }

        window.requestAnimationFrame(() => this.animate());
    }

    private shiftPoint(p: any) {
        // GSAP.TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
        GSAP.gsap.to(
            p,
            // 1 + 1 * Math.random(),
            {
                x: p.originX-50+Math.random()*100,
                y: p.originY-50+Math.random()*100,
                ease:GSAP.Circ.easeInOut,
                onComplete: () => {
                    this.shiftPoint(p);
                }
            }
        );
    }

    // Canvas manipulation
    private drawLines(p: any) {
        if(!p.active) return;
        for(let i in p.closest) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p.closest[i].x, p.closest[i].y);
            this.ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            this.ctx.stroke();
        }
    }



    // Util
    private getDistance(p1: any, p2: any) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
}

class Circle {
    private parent: any;
    private pos: any;
    private radius: any;
    private color: any;
    public active!: number;

    constructor(
        parent: any, pos: any, rad: any, color: any
    ) {
        this.parent = parent;
        this.pos = pos || null;
        this.radius = rad || null;
        this.color = color || null;
    }


    public draw() {
        if(!this.active) return;
        this.parent.ctx.beginPath();
        this.parent.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        this.parent.ctx.fillStyle = 'rgba(156,217,249,'+ this.active+')';
        this.parent.ctx.fill();
    };
}
