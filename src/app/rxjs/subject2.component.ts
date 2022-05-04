import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    template:``
})
export class RxjsComponent2{
    private subject = new Subject<number>();
    constructor(
    ) {

        this.subject.next(1); //Subjects will not output this value

        // subscribe 가 정의된 이후부터 값을 가져온다.
        this.subject.subscribe({
          next: (v) => console.log('observerA: ' + v)
        });
        this.subject.subscribe({
          next: (v) => console.log('observerB: ' + v)
        });


        this.subject.next(2);
        this.subject.next(3);
    }
}