import { Component, ViewChild, ViewChildren, OnInit, ElementRef, AfterViewInit, Renderer2, AfterViewChecked, QueryList } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `<p>parent works!</p>
  <app-child #child></app-child>
  <button (click)='removeChild()'>remove child</button>`,
  styleUrls: ['./parent.component.css']
})
export class DomComponent4 implements AfterViewChecked{

  @ViewChildren('child', {read: ElementRef}) childComp:QueryList<ElementRef<any>> = {} as ElementRef;

  constructor(private renderer: Renderer2, private host: ElementRef) {
  }

  ngAfterViewChecked() {
    console.log(this.childComp.length)
  }

  removeChild(){
    this.renderer.removeChild(this.host.nativeElement, this.childComp.first.nativeElement);
  }
}