import {NgModule, Component, Input, OnDestroy} from '@angular/core'; //, Injector* , Input, Output
import { SocketService }		from './socket.service';
import { CommonModule }			from "@angular/common";
import { MaterialModule }		from '@angular/material';
import { FormsModule }			from '@angular/forms';
import { Subscription }			from 'rxjs/Subscription'

//declare var jQuery:any;

@Component({
	selector: 'tab2',
	template: `
here is tab2
`
})
export class ChanceTalkListComponent{
	//showNum = 0;
	//messages:string			= "";//채팅 내용;
//	data:any				= {message:""};
	dynamicHeight:number	= 300;
	sockConnection			= new Array();
	footerObj:any;
	setData:any = {lists:{}};


	@Input() set selectedGameIndex(index) {

		console.log("from tab2", index)
		if(index == 1){
			//socket.emit('leave_curent_room', '@basic1');
			console.log("remove publicChat : index 1")
			this.socketService.removeListener('publicChat');//0
			//공개 채팅방이면

		}

	}

	constructor(private socketService:SocketService) {//private injector: Injector


	}

//	ionViewWillLeave() {//ngOnDestroy가 동작하지 않음
	//	console.log("Looks like I'm about to leave :(");
		//closing connected sockets
		//for(var i=0; i < this.sockConnection.length; i++)
			//this.sockConnection[i].unsubscribe();

	//}


	//event subscript end
}

@NgModule({
	declarations:	[ ChanceTalkListComponent ],
	imports:		[ MaterialModule, CommonModule, FormsModule],
	exports:		[ ChanceTalkListComponent ],
	providers:		[  ]
})
export class ChatTab2{}
