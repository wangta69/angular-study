# DOM Elemnet 다루기
## ViewChild 를 이용한 방법
##### src/app/dom-element/step1.component.ts
```
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
```
## Directive 를 이용한 방법
##### src/app/dom-element/step2.component.ts
```
import { Component} from '@angular/core';
@Component({
    selector: 'app-root',
    template:`<span [appHighlight]="'highlight'">I am pondol.</span>
    <span>I am a web developer.</span>`,
    styles:[`[highlight]{background: green; color: white;}`]
})
export class DomComponent2{}
```
##### src/app/dom-element/step2.highlight.directive.ts
```
import { Directive, Input, OnInit, ElementRef } from '@angular/core';
@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit{
    @Input() appHighlight: any;
    constructor( private element: ElementRef) { }
    ngOnInit(){
    this.element.nativeElement.setAttribute(this.appHighlight, '');
    }
}
```
## Renderer를 이용하는 방법
##### src/app/dom-element/step3.component.ts
위의 방법과 크게 다르지 않으나 차이가 있다면 highlight를 renderer 및 setSttribute를 이용하여 동적으로 추가하는 차이가 있다
```
import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

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
         private renderer: Renderer2
    ) { }

    ngAfterViewInit(){
        this.renderer.setAttribute(this.span.nativeElement, this.appHighlight, '')
    }
}
```

## Renderer를 이용하여 Child Remove
feat. using QueryList
##### src/app/dom-element/step4.component.ts
```
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
```

## Renderer를 이용하여 Create, Append, Remove 활용
##### src/app/dom-element/step5.component.ts
```
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
```

rederer의 활용
```
this.renderer.appendChild(this.el.nativeElement, div);
this.renderer.removeChild(parent.nativeElement, child);
this.renderer.setAttribute(this.el.nativeElement, 'aria-hidden', 'true');
this.renderer.addClass(this.el.nativeElement, 'wild');
this.renderer.removeClass(this.el.nativeElement, 'wild');
this.renderer.setStyle( el.nativeElement, 'border-left', '2px dashed olive');
this.renderer.removeStyle(this.el.nativeElement, 'border-left');
this.renderer.setProperty(this.el.nativeElement, 'alt', 'Cute alligator');
this.renderer.createElement('span');
this.renderer.selectRootElement("#chatinput").focus();
```

## 내가 많이 사용하는 방법
실제로 내가 많이 사용하는 것은 classList를 활용하는 방법이다.
```
# el은 nativeElement를 의미
el.classList.toggle(cls);
el.classList.remove("foo");
el.classList.add("anotherclass");
el.classList.add("foo", "bar", "baz");
el.classList.remove("foo", "bar", "baz");
el.classList.contains("anotherclass"); // has class와 동일
```
