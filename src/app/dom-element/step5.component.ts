 import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div #myele>11</div>
        <button (click)='removeChild()'>remove child</button>
    `,
})
export class DomComponent5 implements OnInit, AfterViewInit{
    @ViewChild('myele', {static: false}) myelement: ElementRef<HTMLDivElement> = {} as ElementRef;
    child!: ElementRef;
    parent!: ElementRef;
    constructor(private renderer: Renderer2, private host: ElementRef) {
    }

    ngOnInit() {

    }
    ngAfterViewInit(){
        console.log('=====');
        this.parent = this.renderer.createElement('div');
        this.child = this.renderer.createElement('span');
        const text = this.renderer.createText('Hello world!');
        this.renderer.appendChild(this.child, text);
        this.renderer.appendChild(this.parent, this.child);
        this.renderer.appendChild(this.myelement.nativeElement, this.parent);
    }

    removeChild(){
        this.renderer.removeChild(this.myelement.nativeElement, this.parent);
    }
}