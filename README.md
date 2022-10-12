# Angular Study
## routing
[Routing](/document/routing.md "routing")

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
[Canvas](/document/canvas.md "Canvas")

## Canvas를 이용한 재미나는 효과들
[Canvas Effect](/document/canvas-effect.md "Canvas Effect")
## 효과  다루기
[GSAP](/document/gsap.md "GSAP")
## Sound  다루기
[DOM Element](/document/sound.md "Sound")

## Input Event 다루기 (마우스, 키보드, 터치, HammerJs)
[Input Event](/document/input-event.md "Input Event")

## rxjs  다루기
[RXJS](/document/rxjs.md "rxjs")

## underScore.js 다루기
[Under Score](/document/under-score.md "under-score")

## xml 다루기
[XML](/document/xml.md "xml")

## cryptoJs 다루기
[CryptoJs](/document/cryptojs.md "cryptojs")

## googlechart 다루기
[GoogleChart](/document/googlechart.md "googlechart")
