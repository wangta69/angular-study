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



