import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// https://code.tutsplus.com/articles/21-ridiculously-impressive-html5-canvas-experiments--net-14210
@Component({
    selector: 'app-root',
    template:`
    <canvas #canvasId>
    </canvas>`
})
export class CanvasEffectComponent2 implements AfterViewInit{
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

        this.ctx.fillStyle = 'black';
        this.ctx.fillRect( 0, 0, this.w, this.h );

        this.opts = {
            len: 20,
            count: 50,
            baseTime: 10,
            addedTime: 10,
            dieChance: .05,
            spawnChance: 1,
            sparkChance: .1,
            sparkDist: 10,
            sparkSize: 2,

            color: 'hsl(hue, 100%, light%)',
            baseLight: 50,
            addedLight: 10, // [50-10,50+10]
            shadowToTimePropMult: 6,
            baseLightInputMultiplier: .01,
            addedLightInputMultiplier: .02,

            cx: this.w / 2,
            cy: this.h / 2,
            repaintAlpha: .04,
            hueChange: .1
        };

        this.tick = 0;
        this.lines = [];
        this.dieX = this.w / 2 / this.opts.len;
        this.dieY = this.h / 2 / this.opts.len;

        this.baseRad = Math.PI * 2 / 6;

        this.loop();
    }





    private loop() {

        window.requestAnimationFrame(() => this.loop());

        ++this.tick;

        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = 'rgba(0,0,0,alp)'.replace( 'alp', this.opts.repaintAlpha );
        this.ctx.fillRect( 0, 0, this.w, this.h );
        this.ctx.globalCompositeOperation = 'lighter';

        if( this.lines.length < this.opts.count && Math.random() < this.opts.spawnChance )
        this.lines.push( new Line(this) );

        this.lines.map( ( line: any) => {
            line.step();
        } );
    }




    //
    // window.addEventListener( 'resize', function(){
    //
    //   w = c.width = window.innerWidth;
    //   h = c.height = window.innerHeight;
    //   ctx.fillStyle = 'black';
    //   ctx.fillRect( 0, 0, w, h );
    //
    //   opts.cx = w / 2;
    //   opts.cy = h / 2;
    //
    //   dieX = w / 2 / opts.len;
    //   dieY = h / 2 / opts.len;
    // });
}

class Line {

    private x = 0;
    private y = 0;
    private addedX = 0;
    private addedY = 0;

    private rad = 0;

    private lightInputMultiplier: any;

    private color: any;
    private cumulativeTime = 0;

    private parent: any;

    private time!: number;
    private targetTime!: number;

    constructor (parent: any) {
        this.parent = parent;
        this.reset();
    }

    // Line.prototype start;
    reset() {

      this.x = 0;
      this.y = 0;
      this.addedX = 0;
      this.addedY = 0;

      this.rad = 0;

      this.lightInputMultiplier = this.parent.opts.baseLightInputMultiplier + this.parent.opts.addedLightInputMultiplier * Math.random();

      this.color = this.parent.opts.color.replace( 'hue', this.parent.tick * this.parent.opts.hueChange );
      this.cumulativeTime = 0;

      this.beginPhase();
    }
    beginPhase(){

      this.x += this.addedX;
      this.y += this.addedY;

      this.time = 0;
      this.targetTime = ( this.parent.opts.baseTime + this.parent.opts.addedTime * Math.random() ) |0;

      this.rad += this.parent.baseRad * ( Math.random() < .5 ? 1 : -1 );
      this.addedX = Math.cos( this.rad );
      this.addedY = Math.sin( this.rad );

      if( Math.random() < this.parent.opts.dieChance || this.x > this.parent.dieX || this.x < -this.parent.dieX || this.y > this.parent.dieY || this.y < -this.parent.dieY )
        this.reset();
    }
    step(){

      ++this.time;
      ++this.cumulativeTime;

      if( this.time >= this.targetTime )
        this.beginPhase();

      var prop = this.time / this.targetTime,
          wave = Math.sin( prop * Math.PI / 2  ),
          x = this.addedX * wave,
          y = this.addedY * wave;

      this.parent.ctx.shadowBlur = prop * this.parent.opts.shadowToTimePropMult;
      this.parent.ctx.fillStyle = this.parent.ctx.shadowColor = this.color.replace( 'light', this.parent.opts.baseLight + this.parent.opts.addedLight * Math.sin( this.cumulativeTime * this.lightInputMultiplier ) );
      this.parent.ctx.fillRect( this.parent.opts.cx + ( this.x + x ) * this.parent.opts.len, this.parent.opts.cy + ( this.y + y ) * this.parent.opts.len, 2, 2 );

      if( Math.random() < this.parent.opts.sparkChance )
        this.parent.ctx.fillRect(
            this.parent.opts.cx + ( this.x + x ) * this.parent.opts.len + Math.random() * this.parent.opts.sparkDist * ( Math.random() < .5 ? 1 : -1 ) - this.parent.opts.sparkSize / 2,
            this.parent.opts.cy + ( this.y + y ) * this.parent.opts.len + Math.random() * this.parent.opts.sparkDist * ( Math.random() < .5 ? 1 : -1 ) - this.parent.opts.sparkSize / 2,
            this.parent.opts.sparkSize,
            this.parent.opts.sparkSize
        )
    }
}