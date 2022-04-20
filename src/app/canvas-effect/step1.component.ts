import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// https://code.tutsplus.com/articles/21-ridiculously-impressive-html5-canvas-experiments--net-14210
@Component({
    selector: 'app-root',
    template:`
    <div id="control-panel">
        <p>Click and drag to make more!</p>
        <label>Trails: </label>
        <input type="checkbox" id="trail" name="trail" checked />
        <button id="clear" (click)="clear()">Clear</button>
    </div>

    <canvas #canvasId
    (mousedown)="onMouseDown($event)"
    (mouseup)="onMouseUp()"
    >
    </canvas>`
})
export class CanvasEffectComponent1 implements AfterViewInit{
    @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;
    private canvas: any;
    private ctx: any;

    private dpr = window.devicePixelRatio;
    private cw = window.innerWidth;
    private ch = window.innerHeight;

    private orbs: any = [];
    private trail = true;
    // private trailCB: any;

    constructor(
    ) {
    }

    ngAfterViewInit(){
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = this.cw * this.dpr;
        this.canvas.height = this.ch * this.dpr;
        this.ctx = this.canvas.getContext('2d');

        this.ctx.scale(this.dpr, this.dpr);


        this.ctx.lineCap = 'round';
        this.orbs = [];

        // this.trailCB = document.getElementById('trail');
        // this.trail = this.trailCB.checked;


        let count = 100;
        while(count--){
            this.createOrb(this.cw / 2, this.ch / 2 + (count * 2));
        }

        this.loop();

    }


    private rand(rMi: number, rMa: number){
        return ~~((Math.random() * (rMa - rMi + 1)) + rMi);
    }


    private createOrb(mx: number, my: number){
        const dx = (this.cw / 2) - mx;
        const dy = (this.ch / 2) - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const self = this;

        this.orbs.push({
            x: mx,
            y: my,
            lastX: mx,
            lastY: my,
            hue: 0,
            colorAngle: 0,
            angle: angle + Math.PI / 2,
            //size: .5+dist/250,
            size: self.rand(1, 3) / 2,
            centerX: self.cw / 2,
            centerY: self.ch / 2,
            radius: dist,
            speed: (self.rand(5, 10) / 1000) * (dist / 750)+.015,
            alpha: 1 - Math.abs(dist) / this.cw,
            draw: function() {
                // console.log(this.colorAngle);
                self.ctx.strokeStyle = 'hsla(' + this.colorAngle + ', 100%, 50%, 1)';
                self.ctx.lineWidth = this.size;
                self.ctx.beginPath();
                self.ctx.moveTo(this.lastX, this.lastY);
                self.ctx.lineTo(this.x, this.y);
                self.ctx.stroke();
            },
            update: function(){
                const mx = this.x;
                const my = this.y;
                this.lastX = this.x;
                this.lastY = this.y;
                const x1 = self.cw / 2;
                const y1 = self.ch / 2;
                const x2 = mx;
                const y2 = my;
                const rise = y1 - y2;
                const run = x1 - x2;
                const slope = -(rise / run);
                const radian = Math.atan(slope);
                let angleH = Math.floor(radian * (180 / Math.PI));
                if(x2 < x1 && y2 < y1){angleH += 180;}
                if(x2 < x1 && y2 > y1){angleH += 180;}
                if(x2 > x1 && y2 > y1){angleH += 360;}
                if(y2 < y1 && this.slope === '-Infinity'){angleH = 90;}
                if(y2 > y1 && this.slope === 'Infinity'){angleH = 270;}
                if(x2 < x1 && this.slope =='0'){angleH = 180;}
                if(isNaN(angleH)){angleH = 0;}

                this.colorAngle = angleH;
                this.x = this.centerX + Math.sin(this.angle * -1) * this.radius;
                this.y = this.centerY + Math.cos(this.angle * -1) * this.radius;
                this.angle += this.speed;

            }
        });
    }


    private orbGo(e: any){
        let mx = e.pageX - this.canvas.offsetLeft;
        let my = e.pageY - this.canvas.offsetTop;
        this.createOrb(mx,my);
    }

    // private turnOnMove(){
    //     this.canvas.addEventListener('mousemove', this.orbGo, false);
    // }
    //
    // private turnOffMove(){
    //     this.canvas.removeEventListener('mousemove', this.orbGo, false);
    // }
    //
    // private toggleTrails(){
    //     this.trail = this.trailCB.checked;
    // }

    public clear(){
        this.orbs = [];
    }

    public onMouseDown(e: any) {
        this.orbGo(e);
        // this.turnOnMove();
    }

    public onMouseUp() {
        // this.turnOffMove();
    }


    private loop(){
        // window.requestAnimFrame(loop);
        window.requestAnimationFrame(() => this.loop());
        // console.log('l');
        if(this.trail){
            this.ctx.fillStyle = 'rgba(0,0,0,.1)';
            this.ctx.fillRect(0, 0, this.cw, this.ch);
        } else {
            this.ctx.clearRect(0, 0, this.cw, this.ch);
        }
        let i = this.orbs.length;
        while(i--){
            let orb = this.orbs[i];
            let updateCount = 3;
            while(updateCount--){
                orb.update();
                orb.draw(this.ctx);
            }

        }
    }
}