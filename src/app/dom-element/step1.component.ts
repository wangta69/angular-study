import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-root',
  template:`<span #el>I am pondol.</span>
  <span>I am a web developer.</span>`,
  styles:[`[highlight]{background: green; color: white}`]
})
export class DomComponent1 implements AfterViewInit{
  @ViewChild('el', {static: false}) span: ElementRef<HTMLElement> = {} as ElementRef;

  ngAfterViewInit(){
    this.span.nativeElement.setAttribute('highlight', '');
  }
}