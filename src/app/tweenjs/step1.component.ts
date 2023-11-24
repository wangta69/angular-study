import { Component, AfterViewInit } from '@angular/core';
import TWEEN from '@tweenjs/tween.js'
@Component({
    selector: 'app-root',
    template:`<div id="box"></div>`,
    styles: ['#box { background-color: deeppink; width: 100px;height: 100px;}']
})
export class TweenJsComponent1 implements AfterViewInit{
  private tween: any;
  private test: string = '';
  constructor(
  ) {
    const animate = (time: number) => {
      this.tween.update(time)
      // this.tween.update()

      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  ngAfterViewInit() {
    const box = document.getElementById('box') // Get the element we want to animate.
    const coords = {x: 0, y: 0} // Start at (0, 0)
    this.tween = new TWEEN.Tween(coords, false) // Create a new tween that modifies 'coords'.
      .to({x: 300, y: 200}, 1000) // Move to (300, 200) in 1 second.
      .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
      .onUpdate(() => {
        console.log('onUPdate');
        if(box) {
          box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
        }
      })
      .start() // Start the tween immediately.

  }
}