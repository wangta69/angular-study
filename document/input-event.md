# Input Event

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