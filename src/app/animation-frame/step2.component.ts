import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template:``
})
export class AnimationFrameComponent2 implements AfterViewInit{


  latestTap = 0;
  timer: number = 0;
  constructor(
  ) { }

  ngAfterViewInit(){

    console.log('ngAfterViewInit');
    // this.animate1();
    // this.animate1;
    // requestAnimationFrame(this.animate2);

    // requestAnimationFrame(() => this.animate3); // Not work
    // requestAnimationFrame(() => this.animate3()); 

    // requestAnimationFrame(this.animate4);
    // requestAnimationFrame(() => this.animate4);
    // requestAnimationFrame(() => this.animate8());
    // requestAnimationFrame(this.animate8);
    requestAnimationFrame(() => this.animate9);

    // requestAnimationFrame(() => this.animate7());
  }

  
  animate6 = (time: number) => {  
    console.log('==================', time);
    this.tmp();
    requestAnimationFrame(this.animate6);
  }

  animate7(time?: number) {  
    console.log('==================', time);
    console.log(time); // first is undefined
    this.tmp();
    requestAnimationFrame(this.animate4); // Error 이렇게 사용할 경우 animate 함수 안의   this.draw()를 인지하지못함
  }


  animate1 = (time?: number) => {  
    console.log(time); // first is undefined
    this.tmp();
    requestAnimationFrame(this.animate1); // Error 이렇게 사용할 경우 animate 함수 안의   this.draw()를 인지하지못함
  }

  animate2 = (time: number) => {  
    console.log(time);
    this.tmp();
    requestAnimationFrame(this.animate2);
  }

  animate3(time?: number)  {  
    console.log(time); // 동작은 되지만 이값을 받아 올수 없다.
    this.tmp();
    // requestAnimationFrame(this.animate3()); // Not work
    requestAnimationFrame(() => this.animate3()); // Not recommand
    // requestAnimationFrame(this.animate3.bind(this)); // OK request next update
  }
  animate4 = (time?: number) => {  
    console.log('==========================');
    console.log(time); // first is undefined
    this.tmp();
    requestAnimationFrame(this.animate4); // Error 이렇게 사용할 경우 animate 함수 안의   this.draw()를 인지하지못함
  }

  animate5(time?: number) {  
    console.log(time); // first is undefined
    this.tmp();
    requestAnimationFrame(this.animate4); // Error 이렇게 사용할 경우 animate 함수 안의   this.draw()를 인지하지못함
  }

  animate8(time?: number) {  
    console.log(time); // first is undefined
    this.tmp();
    requestAnimationFrame(this.animate8.bind(this)); // Error 이렇게 사용할 경우 animate 함수 안의   this.draw()를 인지하지못함
  }

  animate9 = (time?: number) => {  
    console.log('==========================');
    console.log(time); // first is undefined
    this.tmp();
    requestAnimationFrame(this.animate4); // Error 이렇게 사용할 경우 animate 함수 안의   this.draw()를 인지하지못함
  }


  tmp() {
    console.log('tmp')
  }

  // animate(time: number) {  
  //   let now = new Date().getTime();
  //     let timeSince = now - this.latestTap;
  //     this.latestTap = now;
  //   // this.draw();
  //   // window.requestAnimationFrame(() => this.animate()); // OK
  //   requestAnimationFrame(() => this.animate()); // OK window. 를 생략할 수 있다
  //   // requestAnimationFrame(this.animate.bind(this)); // OK request next update
  //   // requestAnimationFrame(this.animate); Error 이렇게 사용할 경우 animate 함수 안의   this.draw()를 인지하지못함
  // }

  
}