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
만약 element 를 className으로 가져올경우 반드시 몇번째 인지 인식 시켜야 한다.
```
const el = document.getElementsByClassName('hint-div');
const display = GSAP.gsap.getProperty(el[0], 'display');

```

## select
```
// Angular
@Component({ ... })
class MyComponent implements OnInit {

  constructor(private el: ElementRef) {
    this.q = GSAP.gsap.utils.selector(el);
  }

  ngOnInit() {    
    // uses this.el.nativeElement.querySelectorAll() internally
    GSAP.gsap.to(this.q(".box"), { x: 100 });
  }
}
```

## easy
https://greensock.com/docs/v3/Eases
```
gsap.to(graph, { duration: 2.5, ease: "expo.out", y: -500 });
```

## event Callback
https://greensock.com/docs/v3/GSAP/Tween/eventCallback()

"onComplete", "onUpdate", "onStart" or "onRepeat"
```
gsap.to(obj, {duration: 1, x: 100, onComplete: myFunction, onCompleteParams: ["param1","param2"]});
myAnimation.eventCallback("onComplete", myFunction, ["param1","param2"]);
```

```
myAnimation.eventCallback("onUpdate", null);
```
```
myAnimation.eventCallback("onComplete", completeHandler)
    .eventCallback("onUpdate", updateHandler, ["param1"]).play(1);
```
