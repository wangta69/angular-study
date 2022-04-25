import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// https://code.tutsplus.com/articles/21-ridiculously-impressive-html5-canvas-experiments--net-14210
// npm i animejs
// npm i --save-dev @types/animejs

import * as anime from 'animejs';


@Component({
    selector: 'app-root',
    template:`
    <canvas #canvasId
    (mousedown)="handleEvent($event)"

    >
        <!-- (document:touchstart)="handleEvent($event)" -->
    </canvas>`
})
export class CanvasEffectComponent5 implements AfterViewInit{
    @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;
    private canvas: any;
    private ctx: any;

    // private largeHeader!: number;
    private cH!: number;
    private cW!: number;
    private bgColor = '#FF6138';
    private animations: any = [];

    private colorPicker = (function() {
        // const colors = ['red', 'green', 'blue', 'gray'];
        const colors = ['#FF6138', '#FFBE53', '#2980B9', '#282741'];
        let index = 0;
        function next() {
            index = index++ < colors.length - 1 ? index : 0;
            return colors[index];
        }
        function current() {
            return colors[index]
        }
        return {
            next: next,
            current: current
        }
    })();


    constructor(
    ) {
    }

    ngAfterViewInit(){
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');

        this.resizeCanvas();

        window.addEventListener('resize', this.resizeCanvas);

        (<any>anime).default({
            duration: Infinity,
            update: () => {
                this.ctx.fillStyle = this.bgColor;
                this.ctx.fillRect(0, 0, this.cW, this.cH);
                this.animations.forEach((anim: any) => {
                    anim.animatables.forEach((animatable: any) => {
                        animatable.target.draw();
                    });
                });
            }
        });

    }

    private removeAnimation(animation: any) {
        const index = this.animations.indexOf(animation);
        if (index > -1) {
            this.animations.splice(index, 1);
        }
    }

    private calcPageFillRadius(x: number, y: number) {
      let l = Math.max(x - 0, this.cW - x);
      let h = Math.max(y - 0, this.cH - y);
      return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
    }


    public handleEvent(e: any) {
        const self = this;
        if (e instanceof TouchEvent) {
             e = e.touches[0];
        }

        const currentColor = this.colorPicker.current();
        const nextColor = this.colorPicker.next();
        const targetR = this.calcPageFillRadius(e.pageX, e.pageY);
        const rippleSize = Math.min(200, (this.cW * .4));
        const minCoverDuration = 750;
        // 1. 점점 커지는 외부 타원을 그린다.
        const pageFill = new Circle(
            this,
            {
                x: e.pageX,
                y: e.pageY,
                r: 0,
                fill: nextColor
            });
        const fillAnimation = (<any>anime).default({
            targets: pageFill,
            r: targetR,
            duration:  Math.max(targetR / 2 , minCoverDuration ),
            easing: 'easeOutQuart',
            complete: () =>{
                self.bgColor = pageFill.fill;
                this.removeAnimation(fillAnimation);
            }

            // complete: this.removeAnimation
        });

        // 2. 희미해지는 내부타원
        const ripple = new Circle(
            this,
            {
                x: e.pageX,
                y: e.pageY,
                r: 0,
                fill: currentColor,
                stroke: {
                    width: 3,
                    color: currentColor
                },
                opacity: 1
            });
        const rippleAnimation = (<any>anime).default({
            targets: ripple,
            r: rippleSize,
            opacity: 0,
            easing: 'easeOutExpo',
            duration: 900,
            complete: () =>{
                this.removeAnimation(rippleAnimation);
            }
        });

        // 3. 조각을 만든다
        const particles = [];
        for (let i=0; i<32; i++) {
            let particle = new Circle(
                this,
                {
                    x: e.pageX,
                    y: e.pageY,
                    fill: currentColor,
                    r: (<any>anime).default.random(24, 48)
                }
            );
            particles.push(particle);
        }
        const particlesAnimation = (<any>anime).default({
            targets: particles,
            x: function(particle: any){
                return particle.x + (<any>anime).default.random(rippleSize, -rippleSize);
            },
            y: function(particle: any){
                return particle.y + (<any>anime).default.random(rippleSize * 1.15, -rippleSize * 1.15);
            },
            r: 0,
            easing: 'easeOutExpo',
            duration: (<any>anime).default.random(1000,1300),
            complete: () => {
                this.removeAnimation(particlesAnimation);
            }
        });
        // 현재 에니메이션을 넣어둔다.
        this.animations.push(fillAnimation, rippleAnimation, particlesAnimation);
    }

    private resizeCanvas() {
        this.cW = window.innerWidth;
        this.cH = window.innerHeight;
        this.canvas.width = this.cW * window.devicePixelRatio;
        this.canvas.height = this.cH * window.devicePixelRatio;
        this.ctx.scale(devicePixelRatio, window.devicePixelRatio);
    };

}

class Circle {
    private parent;

    private x!: number;
    private y!: number;
    private r!: number;
    public fill!: string;
    private stroke: any;
    private opacity!: number;
    constructor(
        parent: any, opts: any
    ) {
        this.parent = parent;
        this.extend(this, opts);
    }

    private extend(a: any, b: any){
        for(let key in b) {
            if(b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }


    public draw() {
        this.parent.ctx.globalAlpha = this.opacity;
        this.parent.ctx.beginPath();
        this.parent.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        if (this.stroke) {
            this.parent.ctx.strokeStyle = this.stroke.color;
            this.parent.ctx.lineWidth = this.stroke.width;
            this.parent.ctx.stroke();
        }
        if (this.fill) {
            this.parent.ctx.fillStyle = this.fill;
            this.parent.ctx.fill();
        }
        this.parent.ctx.closePath();
        this.parent.ctx.globalAlpha = 1;
    }
}

