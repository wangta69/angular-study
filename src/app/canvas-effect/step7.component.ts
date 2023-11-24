import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

class ConfettiParticle {

  private parent: any;
  public x: number; // x-coordinate
  public y: number;  //y-coordinate
  private r: number;  //radius;
  // private d: number;  //density;
  private color: string;
  private tilt: number;
  public tiltAngleIncremental: number;
  public tiltAngle: number;

  constructor(
    color: string, parent: any
  ) {
    this.parent = parent;
    this.x = Math.random() * parent.canvas.width; // x-coordinate
    this.y = (Math.random() * parent.canvas.height) - parent.canvas.height; //y-coordinate
    this.r = this.RandomFromTo(10, 15); //radius;
    // this.d = (Math.random() * parent.mp) + 10; //density;
    this.color = color;
    this.tilt = Math.floor(Math.random() * 10) - 10;
    this.tiltAngleIncremental = (Math.random() * 0.07) + .05;
    this.tiltAngle = 0;
  }

  public draw =  () => {
    this.parent.ctx.beginPath();
    this.parent.ctx.lineWidth = this.r / 2;
    this.parent.ctx.strokeStyle = this.color;
    this.parent.ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
    this.parent. ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
      return this.parent.ctx.stroke();
  }

  private RandomFromTo(from: number, to: number) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }
}



@Component({
  selector: 'app-root',
  template:`
<button (click)="StartConfetti()">start</button><button (click)="StopConfetti()">stop</button>
  <canvas #canvasId></canvas>
  
  `,
  styles: [
      '#color-label {margin-left: 15px; position: absolute; height: 30px; width: 50px;}'
  ]

})
export class CanvasEffectComponent7 implements AfterViewInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  // drawing 관련 변수 시작
  private canvas: any;
  private ctx: any;


  private mp = 550; //max particles
  private particles: ConfettiParticle[] = [];
  private angle = 0;
  private tiltAngle = 0;
  private animationComplete = true;
  private speed = 5;
  private anmationFramId: any;

  constructor(
  ) {
  }

  ngAfterViewInit(){
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = window.innerWidth;;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
  }

  private particleColors = {
    colorOptions: ["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"],
    getColor: function (i: number) {
      const colorIndex = i % 12;
      return this.colorOptions[colorIndex];
    }
  }

  // Resizes the canvas to the available size of the window.
  private resize(){
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }

  private InitializeConfetti() {
    this.particles = [];
    this.animationComplete = false;



    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;



    for (var i = 0; i < this.mp; i++) {
      const particleColor = this.particleColors.getColor(i);
      this.particles.push(new ConfettiParticle(particleColor, this));
    }
    this.anmationFramId = requestAnimationFrame(this.animloop);

    // this.StartConfetti();
  }

  public StartConfetti() {

    cancelAnimationFrame(this.anmationFramId);
    this.animationComplete = false;
    this.InitializeConfetti();
  }

  public StopConfetti() {
    this.animationComplete = true;
    // if (this.ctx == undefined) return;

    cancelAnimationFrame(this.anmationFramId);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  animloop = (time: number) => {  
    this.Draw();
    this.anmationFramId = requestAnimationFrame(this.animloop);
  }

  private Draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.animationComplete) {
      let i = 0;
      this.angle += 0.01;
      this.tiltAngle += 0.1;
      let remainingFlakes = 0;
      this.particles.forEach((particle) => {
        particle.draw();

        this.stepParticle(particle, i);

        if (particle.y <= this.canvas.height) {
          remainingFlakes++;
        }
        i++;
      })

      if (remainingFlakes === 0) {
        this.StopConfetti();
      }
    }
  }

  private stepParticle(particle: any, particleIndex: number) {
    particle.tiltAngle += particle.tiltAngleIncremental;
    // particle.y += (Math.cos(this.angle + particle.d) + 3 + particle.r / 2) / 3;
    particle.y += this.speed;
    particle.x += Math.sin(this.angle);
    particle.tilt = (Math.sin(particle.tiltAngle - (particleIndex / 3))) * 15;
  }

}


