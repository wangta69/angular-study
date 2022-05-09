import { NgModule, Component} from '@angular/core';
import { EventService } from './event.service';

@Component({
    selector: 'app-sub',
    template:`카운트 : {{count}}`
})
export class SubscribeFromService{
    public count!: number;
    constructor(
        private eventSvc: EventService
    ) {

        eventSvc.subscribe()
            .subscribe((res) => {
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
export class SubscribeModule {}