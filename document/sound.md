# Sound 다루기
## package 설치
```
npm i howler
npm i --save-dev @types/howler
```

app.module.ts 에서 별도 세팅 없이 사용하려는 component 에서 new를 이요하여 바로 사용
```
import { Component } from '@angular/core';
import { Howl } from 'howler';
@Component({
    selector: 'app-root',
    template:`<button (click)='play()'>플레이</button>`
})
export class SoundComponent1{
    // sound 관련
    private sounds: any = {
        exxplode: null,
    };

    constructor(
    ) {

        this.sounds.exxplode = new Howl({
          src: ['/assets/sounds/explode.mp3'],
          preload: true,
        });
    }

    public play() {
        this.sounds.exxplode.play();
    }
}
```