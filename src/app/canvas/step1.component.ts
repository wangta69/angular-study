import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-root',
    template:`<canvas #canvasId></canvas>`
})
export class CanvasComponent1 implements AfterViewInit{
    @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;
    constructor(
    ) { }

    ngAfterViewInit(){
        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.font = '20px malgun gothic';
            ctx.fillStyle = 'rgba(255, 0, 255, 1)';
            ctx.fillText('Pondol\'s Angular Canvas', 5, 30);
        }

    }
}