#RxJs

## Subject
```
private subject = new Subject<number>();
constructor(
) {

    this.subject.next(1);
    this.subject.subscribe({
      next: (v) => console.log('observerA: ' + v)
    });
    this.subject.subscribe({
      next: (v) => console.log('observerB: ' + v)
    });

    this.subject.next(2);
    this.subject.next(3);
}
```
결과
```
observerA: 2
observerB: 2
observerA: 3
observerB: 3
```

좀더 디테일할 사용법
```
import { Subject} from 'rxjs'; // , timer, Subject
import { takeUntil, filter, map } from 'rxjs/operators';
.....
private ngUnsubscribe = new Subject();
.....
this.eventSvc.subscribe()
.pipe(takeUntil(this.ngUnsubscribe))
.pipe(filter((message: Message) => message.type === 'touched'))
.pipe(map(message => message.payload))
.subscribe((payload: any) => {
});
....
ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
}
```
ngUnsubscribe: subscribe는 중첩되어 발생할 수 있으므로  Single Page Applilcation에서는 반드시 화면이 사라질때 같이 삭제해 주어야 한다.

여기서는
private ngUnsubscribe = new Subject(); 로 정의를 하고 .pipe(takeUntil(this.ngUnsubscribe)) this.ngUnsubscribe 있는 경우만 수신을 한다.
ngOnDestroy() 에서는 ngUnsubscribe 를 완전히 삭제한다.
takeUntil : 특정값이 참일 경우 실행
filter : 특정값이 참일 경우 실행
map : 특정값만을 리턴 , 여기서는 payload만 수신한다.


## BehaviorSubject
```
private bsubject = new BehaviorSubject<number>(0);
constructor(
) {
    this.bsubject.subscribe({
      next: (v) => console.log('observerA: ' + v)
    });


    this.bsubject.next(1);
    this.bsubject.next(2);

    this.bsubject.subscribe({
      next: (v) => console.log('observerB: ' + v)
    });

    this.bsubject.next(3);
}
```
결과
```
observerA: 0
observerA: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3
```

## Subject vs BehaviorSubject
- Subject 는 this.subject.subscribe 가 정의된 이후 부터의 subject.next 값을 가져온다.
- BehaviorSubject 는 정의시 초기값이 필요하다.
- BehaviorSubject 는 this.bsubject.subscribe 가 정의된 바로 직전의 값부터 가져온다.

## Use Subject in Real Project
일반적으로 이벤트를 발생시키는 곳과 이것을 수신하는 곳은 다르므로 공통적으로 공유할 수 있는 파일이 필요하다.
여기서는 event service 파일을 만드는 방식과 window를 그대로 활용하는 방식 두 가지에 대해서 설명드리겠습니다.

### service 파일을 활용하는 방식
#### 1. event.service.ts 생성
```
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class EventService {
    private handler = new Subject<any>();

    broadcast(type: string, payload: any) {
        this.handler.next({ type, payload });
    }

    subscribe(): Observable<any> {
        return this.handler.asObservable();
    }
}
```
#### 2. app.module.ts 의 providers에 등록
app.module.ts
```
import { EventService } from './services/event.service';
....
@NgModule({
    ....
    providers: [ EventService],
})
```
#### 3. 이벤트 생성
```
.....
import { EventService } from './event.service';

export class BroadCastToService{
    private count = 0;
    constructor(
        private eventSvc: EventService
    ) {

    }

    public up() {
        const type = 'countUp';
        this.count++;
        const payload = {count: this.count};
        this.eventSvc.broadcast(type, payload);
    }
}
```

#### 4. 이벤트 수신
```
import { EventService } from './event.service';

export class SubscribeFromService{
    public count!: number;
    constructor(
        private eventSvc: EventService
    ) {

        eventSvc.subscribe()
            .subscribe((res) => {
                console.log('receiveMessage >>', res);
            });

    }
}
```

### window를 활용하는 방식
window를 활용하면 좀더 빠르게 서비스에 적용할 수 있다.
나는 별도의 (service)파일을 만들어 제어하는 방식을 선호한다.

#### 이벤트 생성
```
import { Subject } from 'rxjs';
....
export class BroadCastToWindow{
    private count = 0;
    private countHandler = new Subject<any>();
    constructor(

    ) {
        (window as any).myEvent = {
            count: this.countHandler
        }
    }

    public up() {
        const type = 'countUp';
        this.count++;
        const payload = {count: this.count};
        this.countHandler.next({ type, payload });

    }
}
```
#### 이벤트 수신
```
export class SubscribeFromService{
    public count!: number;
    constructor(

    ) {
        const gamePausedSubject = (window as any).myEvent.count;
        const subscribe = gamePausedSubject.asObservable();

        subscribe.subscribe((res: any) => {
            console.log('receiveMessage >>', res);
            this.count = res.payload.count;
        });
    }
}
```


### 다른예
이벤트 수신에서 window에 세팅하고 이벤트 발생에서는 window 만 호출하여 처리하는 방식(간략해서 좋음)

이벤트 정의 및 수신
```
import { Subject } from 'rxjs';
constructor() {
    // 이벤트 정의
    (window as any).moveHandler$ = new Subject<number>();

    (window as any).moveHandler$.asObservable().subscribe((moves: number) => {
        // 수신
    });
}
```
이벤트 발생
```
(window as any).moveHandler$.next(this.moves);
```

### EventEmitter 를 활용한 예제
부모 자식간에 이벤트를 주고 받을 때 유용하다.
```
// 이벤트 수신파트
child.ee.subscribe((select: any) => {

});
```
```
// 이벤트 생성 부문
import {EventEmitter} from '@angular/core';

export class [className] {
    public ee: EventEmitter<any> = new EventEmitter<any>();

    method1() {
        this.ee.emit([someValue]);
    }
}
```

