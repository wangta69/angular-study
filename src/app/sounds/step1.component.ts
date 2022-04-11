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