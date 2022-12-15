# NgZone

angular에서 가끔 데이타 변화를 감지 못하는 경우 사용하면 좋다.
가령 component 에서는 데이타가 변경되었는데 template에서는 감지를 못하는 경우가 그 하나 일 것인다.

```
import { NgZone } from '@angular/core';

public mydata: any;
constructor(
    private zone: NgZone
    ) {
}

function testNzZone() {
    this.zone.run(() => {
        this.mydate = 'someThing '
    }
}

```