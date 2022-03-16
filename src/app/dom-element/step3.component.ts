import { Component, ViewChild, OnInit, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`<span #el>I am pondol.</span>
  <span>I am a web developer.</span>`,
  styles:[`[highlight]{background: green; color: white}`]
})
export class DomComponent3 implements AfterViewInit{
    private appHighlight = 'highlight';
      @ViewChild('el', {static: false}) span: ElementRef<HTMLElement> = {} as ElementRef;
    constructor(
         private element: ElementRef,
         private renderer: Renderer2
    ) { }

    ngAfterViewInit(){
        this.renderer.setAttribute(this.span.nativeElement, this.appHighlight, '')
    }
}