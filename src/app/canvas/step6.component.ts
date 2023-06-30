import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
//https://www.geeksforgeeks.org/how-to-draw-with-mouse-in-html-5-canvas/
@Component({
  selector: 'app-root',
  template:`
  <label for="color-input" id="color-label" #colorLabel style="background-color: red"></label>
  <input type="checkbox" id="color-input" checked>

  <div id="color-picker">
    <canvas id="color-block" #colorBlock height="150" width="150"
      (mousedown)="mousedown($event)"
      (mouseup)="mouseup()"
      (document:mousemove)="mousemove($event)"
    ></canvas>
    <canvas id="color-strip" #colorStrip height="150" width="30"
        (click)=click($event);
    ></canvas>
  </div>

  <canvas #canvasId
    (mousedown)="startPainting($event)"
    (mouseup)="stopPainting()"
    (document:mousemove)="sketch($event)"
  >
  </canvas>`,
  styles: [
      '#color-label {margin-left: 15px; position: absolute; height: 30px; width: 50px;}'
  ]

})
export class CanvasComponent6 implements AfterViewInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  @ViewChild('colorBlock', {static: true}) colorBlock: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  @ViewChild('colorStrip', {static: true}) colorStrip: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  @ViewChild('colorLabel', {static: true}) colorLabel: ElementRef<HTMLLabelElement> = {} as ElementRef;

  // drawing 관련 변수 시작
  private canvas: any;
  private ctx: any;
  // Stores the initial position of the cursor
  private coord = {x:0 , y:0};

  // This is the flag that we are going to use to
  // trigger drawing
  private paint = false;
  // drawing 관련 변수 끝

  private colorBlocCtx: any;
  private colorStripcCtx: any;
  private colorBlockCanvas: any;
  private colorStripCanvas: any;
  private rgbaColor = 'rgba(255,0,0,1)';
  private drag = false;

  constructor(
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit(){
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.globalCompositeOperation = 'lighter';



    this.initColorPicker();
  }

  // Resizes the canvas to the available size of the window.
  private resize(){
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }



  // Updates the coordianates of the cursor when
  // an event e is triggered to the coordinates where
  // the said event is triggered.
  private getPosition(event: any){
    this.coord.x = event.clientX - this.canvas.offsetLeft;
    this.coord.y = event.clientY - this.canvas.offsetTop;
  }

  // The following functions toggle the flag to start
  // and stop drawing
  public startPainting(event: any){
    this.paint = true;
    this.getPosition(event);
  }
  public stopPainting(){
    this.paint = false;
  }

  public sketch(event: any){
    if (!this.paint) {
        return;
    }
    // this.ctx.globalAlpha = 0.5; // set global alpha
    this.ctx.beginPath();

    this.ctx.lineWidth = 30;

    // Sets the end of the lines drawn
    // to a round shape.
    this.ctx.lineCap = 'round';

    // this.ctx.strokeStyle = 'red';
    this.ctx.strokeStyle = this.rgbaColor;

    // The cursor to start drawing
    // moves to this coordinate
    this.ctx.moveTo(this.coord.x, this.coord.y);

    // The position of the cursor
    // gets updated as we move the
    // mouse around.
    this.getPosition(event);

    // A line is traced from start
    // coordinate to this coordinate
    this.ctx.lineTo(this.coord.x , this.coord.y);

    // Draws the line.
    this.ctx.stroke();
  }

  private initColorPicker() {
    this.colorBlockCanvas = this.colorBlock.nativeElement;
    this.colorBlocCtx = this.colorBlockCanvas.getContext('2d');
    this.colorStripCanvas = this.colorStrip.nativeElement;
    this.colorStripcCtx = this.colorStripCanvas.getContext('2d');

    const width1 = this.colorBlockCanvas.width;
    const height1 = this.colorBlockCanvas.height;
    const width2 = this.colorStripCanvas.width;
    const height2 = this.colorStripCanvas.height;


    this.colorBlocCtx.rect(0, 0, width1, height1);
    this.fillGradient();

    this.colorStripcCtx.rect(0, 0, width2, height2);
    var grd1 = this.colorStripcCtx.createLinearGradient(0, 0, 0, height1);
    grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
    grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
    this.colorStripcCtx.fillStyle = grd1;
    this.colorStripcCtx.fill();
  }

  private fillGradient() {
    this.colorBlocCtx.fillStyle = this.rgbaColor;
    this.colorBlocCtx.fillRect(0, 0, this.colorBlockCanvas.width, this.colorBlockCanvas.height);

    const grdWhite = this.colorStripcCtx.createLinearGradient(0, 0, this.colorBlockCanvas.width, 0);
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    this.colorBlocCtx.fillStyle = grdWhite;
    this.colorBlocCtx.fillRect(0, 0, this.colorBlockCanvas.width, this.colorBlockCanvas.height);

    const grdBlack = this.colorStripcCtx.createLinearGradient(0, 0, 0, this.colorBlockCanvas.height);
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    this.colorBlocCtx.fillStyle = grdBlack;
    this.colorBlocCtx.fillRect(0, 0, this.colorBlockCanvas.width, this.colorBlockCanvas.height);
  }

  public mousedown(e: any) {
    this.drag = true;
    this.changeColor(e);
  }

  public mousemove(e: any) {
    if (this.drag) {
      this.changeColor(e);
    }
  }

  public mouseup() {
    this.drag = false;
  }

  private changeColor(e: any) {
    const x = e.offsetX;
    const y = e.offsetY;
    const imageData = this.colorBlocCtx.getImageData(x, y, 1, 1).data;
    this.rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    // this.colorLabel.
    this.renderer.setStyle( this.colorLabel.nativeElement, 'background-color', this.rgbaColor);
    // colorLabel.style.backgroundColor = this.rgbaColor;
  }

  public click(e: any) {
    const x = e.offsetX;
    const y = e.offsetY;
    const imageData = this.colorStripcCtx.getImageData(x, y, 1, 1).data;
    this.rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    this.fillGradient();
  }
}
