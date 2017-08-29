import { NgModule, Component }	from '@angular/core';

import { CommonModule }		from "@angular/common";
import { MaterialModule }	from '@angular/material';
import { MessageService } from '../globalevent/message.service'

@Component({
	selector: 'event-gen',
	template: `
	<button (click)="genEvent('popup1')">popup1</button>
	<button (click)="genEvent('popup2')">popup2</button>
	`
})

export class EventGenComponent{
	constructor(private messageService: MessageService) {}

	genEvent(flag){

		let payload = {
			component: flag
		}
		this.messageService.broadcast('receiver', payload);
	}
}

@NgModule({
	declarations:	[ EventGenComponent ],
	imports:		[ ],
	exports:		[ EventGenComponent ],//providers:		[  AuthService]
	providers:		[  ]
})
export class EventGenComponentModule{}
