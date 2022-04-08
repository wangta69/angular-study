import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
    selector: 'app-root',
    template:`<canvas #canvasId></canvas>`
})
export class CanvasComponent4 implements AfterViewInit{
    @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

    private ctx: any;
    private x: number = 0;
    private y: number = 0;

    constructor(
    ) {
    }

    ngAfterViewInit(){
        const canvas = this.canvasRef.nativeElement;
        canvas.width = 500;
        canvas.height = 500;
        this.ctx = canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.globalCompositeOperation = 'lighter';

        this.animate();
        this.drawGradient();
    }

    private drawGradient (){
        // 그라디언트를 생성한다
        // The inner circle is at x=45, y=45, with radius=10
        // The outer circle is at x=52, y=50, with radius=30
        const radgrad = this.ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
        radgrad.addColorStop(0, '#A7D30C');
        radgrad.addColorStop(0.9, '#019F62');
        radgrad.addColorStop(1, 'rgba(1, 159, 98, 0)');

        const radgrad2 = this.ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
        radgrad2.addColorStop(0, '#FF5F98');
        radgrad2.addColorStop(0.75, '#FF0188');
        radgrad2.addColorStop(1, 'rgba(255, 1, 136, 0)');

        const radgrad3 = this.ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
        radgrad3.addColorStop(0, '#00C9FF');
        radgrad3.addColorStop(0.8, '#00B5E2');
        radgrad3.addColorStop(1, 'rgba(0, 201, 255, 0)');

        const radgrad4 = this.ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
        radgrad4.addColorStop(0, '#F4F201');
        radgrad4.addColorStop(0.8, '#E4C700');
        radgrad4.addColorStop(1, 'rgba(228, 199, 0, 0)');


        this.ctx.fillStyle = radgrad4;
        this.ctx.fillRect(0, 0, 150, 150)
        this.ctx.fillStyle = radgrad3;
        this.ctx.fillRect(0, 0, 150, 150)
        this.ctx.fillStyle = radgrad;
        this.ctx.fillRect(0, 0, 150, 150)
        this.ctx.fillStyle = radgrad2;
        this.ctx.fillRect(0, 0, 150, 150)
        this.ctx.fillStyle = radgrad;
        this.ctx.fillRect(0, 0, 150, 150)


        const radgrad5 = this.ctx.createRadialGradient(250, 250, 10, 250, 250, 150);
        radgrad5.addColorStop(0, '#1FA2FF');
        radgrad5.addColorStop(0.51, '#12D8FA');
        radgrad5.addColorStop(1, '#1FA2FF');

        this.ctx.fillStyle = radgrad5;
        this.ctx.strokeStyle= 'rgba(100, 100, 100, 0.2)';
        this.ctx.lineWidth = 3;
        // this.ctx.strokeStyle = 'green';
        // this.ctx.strokeRect(200, 200, 100, 100);

        this.ctx.fillRect(200, 200, 100, 100)
        // this.ctx.lineJoin = 'miter'; // round | bevel | miter


    }

    // private drawRectangle (){
    //     this.ctx.fillRect(25, 25, 100, 100);
    //     this.ctx.clearRect(45, 45, 60, 60);
    //     this.ctx.strokeRect(50, 50, 50, 50);
    // }

    // private drawRectangle (){
    //     this.ctx.rect(40, 40, 100, 100);
    //     // this.ctx.lineJoin = 'miter'; // round | bevel | miter
    //     this.ctx.fillStyle = '#8ED6FF';
    //     this.ctx.shadowColor= 'black';
    //     this.ctx.shadowBlur = 10;
    //     this.ctx.fill();
    //     this.ctx.save();
    //
    // }


    private animate() {
        window.requestAnimationFrame(() => this.animate());
    }
}
