#GSAP

```
npm i gsap
```
```
import * as GSAP from 'gsap';
```

https://greensock.com/cheatsheet/
defulat setting
```
GSAP.gsap.set(element, { width: "calc(25% - 10px)" });
```
```
GSAP.gsap.to(this.container.nativeElement, {
    opacity: 1
});

GSAP.gsap.to(this.container2.nativeElement, {
    transformOrigin: 'center bottom',
    scaleY: -1,
    opacity: 1
});

GSAP.gsap.to(this.canvas2, {
    filter: 'blur(10px)'
});
```

```
GSAP.gsap.to(document.getElementsByClassName('message'), { // className을 이용해서 가져올 수 도 있다.
    opacity: 0,
    display: 'none',
});

GSAP.gsap.to(document.getElementById('map'), {
    opacity: 0,
    display: 'block',
});
GSAP.gsap.to(document.getElementById('map'), { // transition time
    duration: 1 // 초 단위로 설정
});

GSAP.gsap.to(document.getElementById('map'), {
    delay: 1 // 초 단위로 설정
});

```
순차적 진행및 call back
```
const tl = GSAP.gsap.timeline();
tl.to(el, {
    top:  `calc(${this.tubePosition[this.currentLevel][to][1]}px - 90px)`,
    left: `calc(50vw + ${this.tubePosition[this.currentLevel][to][0]}px - 70px)`,
    rotate: 75,
    zIndex: 100
}).to(el, {
    rotate: 90
}).to(el, {
    top: `calc(${this.tubePosition[this.currentLevel][from][1]}px)`,
    left: `calc(50vw + ${this.tubePosition[this.currentLevel][from][0]}px)`,
    rotate: 0
}).to(el, {
    zIndex: 0
});

tl.eventCallback("onComplete", () => {this.transferring = false});
```

## element 정보 가져오기
```
GSAP.gsap.getProperty([Element], 'left');
const width = GSAP.gsap.getProperty('body', 'width');
```
