import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// https://code.tutsplus.com/articles/21-ridiculously-impressive-html5-canvas-experiments--net-14210
@Component({
    selector: 'app-root',
    template:`
    <canvas #canvasId>
    </canvas>`
})
export class CanvasEffectComponent3 implements AfterViewInit{
    @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;
    private canvas: any;
    private ctx: any;
    private opts: any;

    private w!: number;
    private h!: number;
    private tick = 0;
    private lines: any = [];
    private dieX!: number;
    private dieY!: number;

    private baseRad!: number;

    private light = {
        x: 160,
        y: 200
    }



    private boxes = [];
    // c.width = cw * dpr;
    // c.height = ch * dpr;
    // ctx.scale(dpr, dpr);


    constructor(
    ) {
    }

    ngAfterViewInit(){
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.w = this.canvas.width;
        this.h = this.canvas.height;


    }


    // var c = document.getElementById("canvas");
    // var ctx = c.getContext("2d");

    private resize() {
        var box = this.canvas.getBoundingClientRect();
        this.canvas.width = box.width;
        this.canvas.height = box.height;
    }



    private drawLight() {
        this.ctx.beginPath();
        this.ctx.arc(this.light.x, this.light.y, 1000, 0, 2 * Math.PI);
        var gradient = this.ctx.createRadialGradient(this.light.x, this.light.y, 0, this.light.x, this.light.y, 1000);
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
        this.ctx.clearRect(0, 0, c.width, c.height);
        drawLight();

        for (var i = 0; i < boxes.length; i++) {
            boxes[i].rotate();
            boxes[i].drawShadow();
        };
        for (var i = 0; i < boxes.length; i++) {
            collisionDetection(i)
            boxes[i].draw();
        };
        requestAnimationFrame(draw);
    }

    resize();
    draw();

    while (boxes.length < 14) {
        boxes.push(new Box());
    }

    window.onresize = resize;
    c.onmousemove = function(e) {
        light.x = e.offsetX == undefined ? e.layerX : e.offsetX;
        light.y = e.offsetY == undefined ? e.layerY : e.offsetY;
    }


    private collisionDetection(b){
        for (var i = boxes.length - 1; i >= 0; i--) {
            if(i != b){
                var dx = (boxes[b].x + boxes[b].half_size) - (boxes[i].x + boxes[i].half_size);
                var dy = (boxes[b].y + boxes[b].half_size) - (boxes[i].y + boxes[i].half_size);
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < boxes[b].half_size + boxes[i].half_size) {
                    boxes[b].half_size = boxes[b].half_size > 1 ? boxes[b].half_size-=1 : 1;
                    boxes[i].half_size = boxes[i].half_size > 1 ? boxes[i].half_size-=1 : 1;
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



    private getDots () {

        var full = (Math.PI * 2) / 4;


        var p1 = {
            x: this.x + this.half_size * Math.sin(this.r),
            y: this.y + this.half_size * Math.cos(this.r)
        };
        var p2 = {
            x: this.x + this.half_size * Math.sin(this.r + full),
            y: this.y + this.half_size * Math.cos(this.r + full)
        };
        var p3 = {
            x: this.x + this.half_size * Math.sin(this.r + full * 2),
            y: this.y + this.half_size * Math.cos(this.r + full * 2)
        };
        var p4 = {
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
    private rotate() {
        var speed = (60 - this.half_size) / 20;
        this.r += speed * 0.002;
        this.x += speed;
        this.y += speed;
    }
    private draw() {
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
    private drawShadow() {
        const dots = this.getDots();
        const angles = [];
        const points = [];

        for (const dot in dots) {
            const angle = Math.atan2(light.y - dots[dot].y, light.x - dots[dot].x);
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
