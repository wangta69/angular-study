import {NgModule, Component, Input} from '@angular/core'; //, Injector* , Input, Output
import { SocketService }		from './socket.service';
import { CommonModule }		from "@angular/common";
import { MaterialModule }	from '@angular/material';
import { FormsModule }		from '@angular/forms';

declare var jQuery:any;

@Component({
	selector: 'tab1',
	template: `
    here is tab1
	<!-- //chat_box -->
`
})

export class ChatBasicComponent {

	sockConnection			= new Array();

	@Input() set selectedGameIndex(index) {
		if(index == 0){
			//공개 채팅방이면
			this.init();
		}
	}

	constructor(private socketService:SocketService) {}

	init() {
		this.socketService.Emit("add_page", {page:'@basic1'});
		this.socketService.Emit('refreshChatHistory', {'chatRoom' : '@basic1'});;



		// 채팅 내용 히스토리 받기 시작
		this.socketService.sockConnection.publicChat.push(
			this.socketService.On('chatList').subscribe(obj => {
				let my_data:any = obj;
			})
		);

		// 실시간 채팅 내역 받기
		this.socketService.sockConnection.publicChat.push(
			this.socketService.On('receiveMessage').subscribe(obj => {
			})
		);

	}
}

@NgModule({
	declarations: [ ChatBasicComponent ],
	imports: [ MaterialModule, CommonModule, FormsModule],
	exports:[ChatBasicComponent],//providers:		[  AuthService]
})
export class ChatTab1{}
