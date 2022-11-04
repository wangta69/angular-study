# extends

extens 는 상속을 받을 때 사용한다.
여러 components 에서 중복으로 사용하는 소스코드가 많을 경우 매우 유용하다.

- parent.ts
```
import { Injector } from '@angular/core';
export class ParentComponent {
    constructor(
        protected injector: Injector,
    ) {
        this.authSvc = this.injector.get(AuthService);
        .....
    }
}
```
- child.ts
```
import { Injector } from '@angular/core';
export class ChildComponent extends ParentComponent {

    constructor(
        protected injector: Injector,
    ){
        super(injector);
    }

```
override keyword :  부모에서 사용하는 메소드와 동일한 이름을 child 에서 사용하여 속성을 바꿀때..

protected : 무모에서 메소스 정의시 자식에서 사용하고 public 이 아닐 경우

- 자식에서는 this 를 이용하여 부모의 method 에 접근하지만 부모에서는 자식의 값에 접근을 할 수 없다.
이경우 rxjs등을 이용하여 사용할 수도 있지만 callback 을 이용하여 부모에서 자식을 호출하는 방식도 괜찮다.
- parent.ts
```
protected receiveCallback: any = false;

export class ParentComponent {
    public receiveMethod() {
        // somedata receved from api ...
        if (this.receiveCallback) {
            this.receiveCallback(res);
        }
    }
}
```

- child.ts
```
export class ChildComponent extends ParentComponent {

    constructor(
        protected injector: Injector,
    ){
        super(injector);

        this.receiveCallback = (res: any) => { this.receiveResult(res); }
    }

    private receiveResult(res) {
        console.log(res);
    }

```


