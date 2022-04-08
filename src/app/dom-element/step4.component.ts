 import { Component, ViewChildren, ElementRef, AfterViewInit, Renderer2, QueryList } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `<p>parent works!</p>
  <div #child>11</div>
  <div #child>22</div>
  <div #child>33</div>
  <button (click)='removeChild()'>remove child</button>`,
})
export class DomComponent4 implements AfterViewInit{
    @ViewChildren('child', {read: ElementRef}) childComp!:QueryList<any>;
    constructor(private renderer: Renderer2, private host: ElementRef) {
    }
    ngAfterViewInit(){
        console.log(this.childComp.toArray());
    }

    removeChild(){
        console.log(this.childComp.toArray());
        this.renderer.removeChild(this.host.nativeElement, this.childComp.first.nativeElement);
    }
}