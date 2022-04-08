# Angular Study

## socket io
```
npm i socket.io-client
npm i ng-node-socket
```

app.module.ts
```
import { SocketService } from 'ng-node-socket';
@NgModule({
    providers: [
        SocketMultiService,
    ]
})
```

app.components.ts
```
import { SocketMultiService } from 'ng-node-socket';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

''''
export class AppComponent implements OnDestroy {
    private ngUnsubscribe = new Subject();

    ''''''''''''''''''''''''''
    constructor(
        private socket: SocketMultiService,
    ){
        this.socket.init('game', '//localhost:3000');

        this.socket.Emit('game', 'emitSomeThing', {params}, () => {}
        this.socket.On('game', 'onSomeThing')
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: any) => {
            });

    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }



```


## DOM Element 다루기
[DOM Element](/document/domElement.md "DOM Element")

## Canvas 다루기
[DOM Element](/document/canvas.md "Canvas")
