# Angular Study

## socket io
```
npm i ng-node-socket
```

app.module.ts
```
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