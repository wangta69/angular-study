import { NgModule, Component} from '@angular/core';
@Component({
    selector: 'app-window',
    template:`카운트 : {{count}}`
})
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

@NgModule({
    declarations: [
        SubscribeFromService,
    ],
    imports: [
    ],
    exports: [ SubscribeFromService ]
})
export class SubscribeWindowModule {}