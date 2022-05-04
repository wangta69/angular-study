import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    template:``
})
export class RxjsComponent1{
    private messages = new Subject<string>();
    constructor(
    ) {

        this.receiveMessage()
            .subscribe((res) => {
                console.log('receiveMessage >>', res);
            });

        this.sendMessage('my first messages');
    }


    private sendMessage(message: string) {
        this.messages.next(message);
    }

    private receiveMessage(): Observable<string> {
        return this.messages.asObservable();
    }


}