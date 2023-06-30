import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Polygon } from './polygon';
@Component({
  selector: 'app-root',
  template:`<canvas #canvasId></canvas>`
})
export class CanvasComponent2 implements AfterViewInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private ctx: any;
  private polygon: any;

  private canvasWidth!: number;
  private canvasHeight!: number;
  constructor(
  ) {
  }

  ngAfterViewInit(){
    const canvas = this.canvasRef.nativeElement;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.ctx = canvas.getContext('2d');

    this.polygon = new Polygon(
      this.canvasWidth / 2,
      this.canvasHeight / 2,
      this.canvasHeight / 3,
      4 // 삼각형
    );
    this.animate();
  }

  private animate() {
    console.log('animate');
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.polygon.animate(this.ctx);

    window.requestAnimationFrame(() => this.animate());
  }
}