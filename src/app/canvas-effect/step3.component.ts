import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// https://code.tutsplus.com/articles/21-ridiculously-impressive-html5-canvas-experiments--net-14210
@Component({
    selector: 'app-root',
    template:`
    <canvas #canvasId
    (document:mousemove)="onMouseMove($event)"
    >
    </canvas>`
})
export class CanvasEffectComponent3 implements AfterViewInit{
    @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;
    private canvas: any;
    private ctx: any;
    private light = {
        x: 160,
        y: 200
    }

    private boxes: any = [];

    constructor(
    ) {
    }

    ngAfterViewInit(){
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');

        this.resize();
        this.draw();

        while (this.boxes.length < 14) {
            this.boxes.push(new Box(this));
        }

        window.onresize = this.resize;
    }

    private resize() {
        const box = this.canvas.getBoundingClientRect();
        this.canvas.width = box.width;
        this.canvas.height = box.height;
    }

    public onMouseMove(e: any) {

        this.light.x = e.offsetX == undefined ? e.layerX : e.offsetX;
        this.light.y = e.offsetY == undefined ? e.layerY : e.offsetY;
    }

    private drawLight() {
        this.ctx.beginPath();
        this.ctx.arc(this.light.x, this.light.y, 1000, 0, 2 * Math.PI);
        let gradient = this.ctx.createRadialGradient(this.light.x, this.light.y, 0, this.light.x, this.light.y, 1000);
        gradient.addColorStop(0, "#3b4654");
        gradient.addColorStop(1, "#2c343f");
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.light.x, this.light.y, 20, 0, 2 * Math.PI);
        gradient = this.ctx.createRadialGradient(this.light.x, this.light.y, 0, this.light.x, this.light.y, 5);
        gradient.addColorStop(0, "#fff");
        gradient.addColorStop(1, "#3b4654");
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawLight();

        for (let i = 0; i < this.boxes.length; i++) {
            this.boxes[i].rotate();
            this.boxes[i].drawShadow();
        };
        for (var i = 0; i < this.boxes.length; i++) {
            this.collisionDetection(i)
            this.boxes[i].draw();
        };

        window.requestAnimationFrame(() => this.draw());
    }

    private collisionDetection(b: number){
        for (let i = this.boxes.length - 1; i >= 0; i--) {
            if(i != b){
                var dx = (this.boxes[b].x + this.boxes[b].half_size) - (this.boxes[i].x + this.boxes[i].half_size);
                var dy = (this.boxes[b].y + this.boxes[b].half_size) - (this.boxes[i].y + this.boxes[i].half_size);
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < this.boxes[b].half_size + this.boxes[i].half_size) {
                    this.boxes[b].half_size = this.boxes[b].half_size > 1 ? this.boxes[b].half_size-=1 : 1;
                    this.boxes[i].half_size = this.boxes[i].half_size > 1 ? this.boxes[i].half_size-=1 : 1;
                }
            }
        }
    }
}

class Box {
    private half_size: number;
    private x: number;
    private y: number;
    private r: number;
    private shadow_length: number;
    private color: string;
    private colors = ["#f5c156", "#e6616b", "#5cd3ad"];
    private parent;
    constructor(
        parent: any
    ) {
        this.parent = parent;
        this.half_size = Math.floor((Math.random() * 50) + 1);
        this.x = Math.floor((Math.random() * this.parent.canvas.width) + 1);
        this.y = Math.floor((Math.random() * this.parent.canvas.height) + 1);
        this.r = Math.random() * Math.PI;
        this.shadow_length = 2000;
        this.color = this.colors[Math.floor((Math.random() * this.colors.length))];
    }



    private getDots (): any {
        const full = (Math.PI * 2) / 4;
        const p1 = {
            x: this.x + this.half_size * Math.sin(this.r),
            y: this.y + this.half_size * Math.cos(this.r)
        };
        const p2 = {
            x: this.x + this.half_size * Math.sin(this.r + full),
            y: this.y + this.half_size * Math.cos(this.r + full)
        };
        const p3 = {
            x: this.x + this.half_size * Math.sin(this.r + full * 2),
            y: this.y + this.half_size * Math.cos(this.r + full * 2)
        };
        const p4 = {
            x: this.x + this.half_size * Math.sin(this.r + full * 3),
            y: this.y + this.half_size * Math.cos(this.r + full * 3)
        };

        return {
            p1: p1,
            p2: p2,
            p3: p3,
            p4: p4
        };
    }
    public rotate() {
        const speed = (60 - this.half_size) / 20;
        this.r += speed * 0.002;
        this.x += speed;
        this.y += speed;
    }
    public draw() {
        var dots = this.getDots();
        this.parent.ctx.beginPath();
        this.parent.ctx.moveTo(dots.p1.x, dots.p1.y);
        this.parent.ctx.lineTo(dots.p2.x, dots.p2.y);
        this.parent.ctx.lineTo(dots.p3.x, dots.p3.y);
        this.parent.ctx.lineTo(dots.p4.x, dots.p4.y);
        this.parent.ctx.fillStyle = this.color;
        this.parent.ctx.fill();


        if (this.y - this.half_size > this.parent.canvas.height) {
            this.y -= this.parent.canvas.height + 100;
        }
        if (this.x - this.half_size > this.parent.canvas.width) {
            this.x -= this.parent.canvas.width + 100;
        }
    }
    public drawShadow() {
        const dots = this.getDots();
        const angles = [];
        const points = [];

        for (const dot in dots) {
            const angle = Math.atan2(this.parent.light.y - dots[dot].y, this.parent.light.x - dots[dot].x);
            const endX = dots[dot].x + this.shadow_length * Math.sin(-angle - Math.PI / 2);
            const endY = dots[dot].y + this.shadow_length * Math.cos(-angle - Math.PI / 2);
            angles.push(angle);
            points.push({
                endX: endX,
                endY: endY,
                startX: dots[dot].x,
                startY: dots[dot].y
            });
        };

        for (var i = points.length - 1; i >= 0; i--) {
            var n = i == 3 ? 0 : i + 1;
            this.parent.ctx.beginPath();
            this.parent.ctx.moveTo(points[i].startX, points[i].startY);
            this.parent.ctx.lineTo(points[n].startX, points[n].startY);
            this.parent.ctx.lineTo(points[n].endX, points[n].endY);
            this.parent.ctx.lineTo(points[i].endX, points[i].endY);
            this.parent.ctx.fillStyle = "#2c343f";
            this.parent.ctx.fill();
        };
    }
}
