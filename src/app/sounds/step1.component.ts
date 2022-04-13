import { Component } from '@angular/core';
import { Howl } from 'howler';
@Component({
    selector: 'app-root',
    template:`<button (click)='play()'>플레이</button><button (click)='bgstop()'>bg stop</button>`
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
        this.sounds.bg = new Howl({
          src: ['/assets/sounds/sample-bg.mp3'],
          autoplay: true,
          preload: true,
          volume: 0.1,
          loop: true,
          onend : () => {
            console.log('Finished!');
          },
          onload: () => {
            console.log('loaded!');
            this.sounds.bg.play();
          }
        });


    }

    public play() {
        this.sounds.exxplode.play();
    }
    public bgstop() {
        this.sounds.bg.stop();
    }
}