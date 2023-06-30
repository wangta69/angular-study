import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`<canvas #canvasId></canvas>`
})
export class AnimationFrameComponent1 implements AfterViewInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  private ctx: any;
  private canvas: any;
  private position = {x:0, y:0};
  
  constructor(
  ) { }

  ngAfterViewInit(){

    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.animate();
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.position.x += 0.1
    this.position.y += 0.1

    this.ctx.fillRect(this.position.x, this.position.y, 50, 50);
    this.ctx.fillStyle = "#FFD662";
  }

  animate() {  
    this.draw();
    // window.requestAnimationFrame(() => this.animate()); // OK
    requestAnimationFrame(() => this.animate()); // OK window. 를 생략할 수 있다
    // requestAnimationFrame(this.animate.bind(this)); // OK request next update
    // requestAnimationFrame(this.animate); Error 이렇게 사용할 경우 animate 함수 안의   this.draw()를 인지하지못함
  }
}