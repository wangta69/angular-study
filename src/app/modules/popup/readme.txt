** 다른 하위 모듈에서 이벤트 발생시 팝업을 노출시키는 프로그램
** Global event 생성 및 리슨은 globalevent 를 참조

popover setting

1. popover module 생성 (popup1.ts 참조)
popover.ts 에 모듈 추가


pop-over


module 에 import { PopOverModule }					from '../../pages/common/popover';
imports:		[ PopOverModule ],
원하는 위치에 <ion-content 바로 하단에 넣어둔다.
<pop-over [component]="popover.component" [paramObj]="popover.paramObj" [show]="popover.show" (show)="popoverDisplay($event)"></pop-over> 삽입


아래와 같이 popover 를 설정한다.
popover = {component:"fight-create", pick:"", show:false}

openPopoverCreateFightRoom(ev) {
        this.popover.show	= true;
};

//popover container 로 부터 수신
popoverDisplay(e){
    this.popover.show	= e
}

popclose(e){
    this.popclosed.emit(false)
}
