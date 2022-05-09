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

