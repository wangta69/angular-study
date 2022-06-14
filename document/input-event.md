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
