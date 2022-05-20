#GSAP

```
npm i gsap
```
```
import * as GSAP from 'gsap';
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
