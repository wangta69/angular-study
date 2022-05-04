import { Component} from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-root',
    template:``
})
export class RxjsComponent3{
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
}