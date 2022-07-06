# Input Event

# Keyboard Event
```
(keydown)="onKeyDown()"
(keyup)="onKeyUp()"
(keypress)="onKeyPress()"
```

# Mouse Event
```
(mouseover)='onMouseOver($event)'
(mouseenter)="onMouseEnter($event)"
(mousedown)="onMouseDown($event)"
(mouseup)="onMouseUp($event)"
mouseout
mouseleave

(mousewheel)="onMouseWheel($event)"

(click)="onMouseClick($event)"
(dblclick)
(drag)
(dragover)
(drop)="myMethod()"

(document:mouseout)
```

마우스 move 는 아래와 같이 두가지 경우로 구현
```
import {Component, NgModule, HostListener} from '@angular/core'

@Component({
  ...
})
export class MyComponent {
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    console.log(e);
  }
  ..
}
```
```
2) Similar to the above, you can also use (document:event)="handler" on any DOM element, but the above solution is prefered because the code is cleaner. By using this, it's not immediately obvious from the class that you have a global event listener, and you might add additional ones unnecessarily.

@Component({
  selector: 'my-app',
  template: `
    <div (document:mousemove)="onMouseMove($event)" id="box"></div>
  `,
})
export class MyComponent {
  onMouseMove(e) {
    console.log(e);
  }
}
```

# TouchEvent
- 핸드폰에 주로 사용하는 이벤트

```
(touchstart)="onTouchStart($event)"
(touchend)="onTouchEnd()"
(touchcancel)="onTouchCancel($event)"
(touchmove)="onTouchMove($event)
```
전체 문서 영역 선택시 document를 둔다
```
(document:touchstart)="onTouchStart($event)"
(document:touchend)="onTouchEnd()"
(document:touchcancel)="onTouchCancel($event)"
(document:touchmove)="onTouchMove($event)
```

# HAMMER JS

## Install
```
npm i hammerjs
npm i --save-dev @types/hammerjs
```
app.module.ts
```
import { NgModule, Injectable } from '@angular/core';
import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
......

@Injectable()
export class HammerConfig extends HammerGestureConfig {
    override overrides = <any> {
        // I will only use the swap gesture so
        // I will deactivate the others to avoid overlaps
        'pinch': { enable: false },
        'pan': { direction: Hammer.DIRECTION_ALL, threshold: 0 },
        'rotate': { enable: false },
    }
}

......
@NgModule({
    .....
    imports: [
        .....
        HammerModule,
    ],
    providers: [
    ....
    {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: HammerConfig
    },

    ]

```
### swipe
app.module.ts
```
@Injectable()
export class HammerConfig extends HammerGestureConfig {
    override overrides = <any> {
        'swipe': { enable: true, direction: Hammer.DIRECTION_ALL, threshold: 1, velocity:0.1 },
    }
}
```
html
```
(swipe)="onSwipe($event)"
(swipeleft)="onSwipeLeft($event)"
(swiperight)="onSwipeRight($event)"
(swipeup)="onSwipeUp($event)"
(swipedown)="onSwipeDown($event)"
```
