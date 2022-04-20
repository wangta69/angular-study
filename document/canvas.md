# Canvas 다루기
## Text 출력
```
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
```

## Image 출력
```
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
    selector: 'app-root',
    template:`<canvas #canvasId></canvas>`
})
export class CanvasComponent5 implements AfterViewInit{
    @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

    private ctx: any;
    private image: any;

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

        this.load('/assets/images/flags/South-Korea-Flag-icon.png');
    }

    private drawImage (){
        // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
        this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, 200, 200);
    }


    private async load(filepath: string) {
        this.image = new Image();
        this.image.src = filepath;
        this.image.onload = () => {
            this.drawImage();
        };
    }


}
```
