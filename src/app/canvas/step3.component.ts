import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-root',
  template:`<canvas #canvasId></canvas>`
})
export class CanvasComponent3 implements AfterViewInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private ctx: any;
  private x: number = 0;
  private y: number = 0;

  constructor(
  ) {
  }

  ngAfterViewInit(){
    const canvas = this.canvasRef.nativeElement;
    canvas.width = 300;
    canvas.height = 300;
    this.ctx = canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.globalCompositeOperation = 'lighter';

    this.animate();
  }

  private drawRectangle (x: number, y: number, w: number, h: number, border: number){
    this.ctx.beginPath();
    this.ctx.moveTo(x + border, y);
    this.ctx.lineTo(x + w - border, y);
    this.ctx.quadraticCurveTo(x + w - border, y, x + w, y + border);
    this.ctx.lineTo(x + w, y + h - border);
    this.ctx.quadraticCurveTo(x + w, y + h - border, x + w - border, y + h);
    this.ctx.lineTo(x + border, y + h);
    this.ctx.quadraticCurveTo(x + border, y + h, x, y + h - border);
    this.ctx.lineTo(x, y + border);
    this.ctx.quadraticCurveTo(x, y + border, x + border, y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  private neonRect (x: number, y: number, w: number, h: number, r: number, g: number, b: number){
    this.ctx.shadowColor = 'rgba(' + r + ',' + g + ',' + b + ', 0.2)';
    this.ctx.shadowBlur = 10;

    this.ctx.strokeStyle= 'rgba(' + r + ',' + g + ',' + b + ', 0.2)';
    this.ctx.lineWidth = 7.5;
    this.drawRectangle(x, y, w, h, 1.5);

    this.ctx.strokeStyle= 'rgba(' + r + ',' + g + ',' + b + ', 0.2)';
    this.ctx.lineWidth = 6;
    this.drawRectangle(x, y, w, h, 1.5);

    this.ctx.strokeStyle= 'rgba(' + r + ',' + g + ',' + b + ', 0.2)';
    this.ctx.lineWidth = 4.5;
    this.drawRectangle(x, y, w, h, 1.5);

    this.ctx.strokeStyle= 'rgba(' + r + ',' + g + ',' + b + ', 0.2)';
    this.ctx.lineWidth = 3;
    this.drawRectangle(x, y, w, h, 1.5);

    this.ctx.strokeStyle= '#fff';
    this.ctx.lineWidth = 1.5;
    this.drawRectangle(x, y, w, h, 1.5);
  };

  private draw(){
    this.neonRect(25 + this.x, 25 + this.y, 50, 50, 243, 243, 21);
    this.neonRect(225 - this.x, 25 + this.y, 50, 50, 193, 253, 51);
    this.neonRect(25 + this.x, 225 - this.y, 50, 50, 255, 153, 51);
    this.neonRect(225 - this.x, 225 - this.y, 50, 50, 252, 90, 184);
    this.neonRect(125, 125, 50, 50, 13, 213, 252);
  }


  private animate() {
    this.x+= 2;
    this.y += 2;
    if(this.x >= 300) {
      this.x =- 50;
      this.y =- 50
    }
    this.ctx.clearRect(0, 0, 300, 300);
    this.draw();
    window.requestAnimationFrame(() => this.animate());
  }
}
