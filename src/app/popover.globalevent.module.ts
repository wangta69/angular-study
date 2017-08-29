import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {PopOverModule } from './modules/popup/popover'
import {EventGenComponentModule } from './modules/popup/eventGenerator'
import {MessageService} from './modules/globalevent/message.service'
import {Subscription} from 'rxjs/Subscription'
@Component({
	selector: 'app-root',
	template: `
		<pop-over [component]="popover.component" [paramObj]="popover.paramObj" [show]="popover.show" (show)="popoverDisplay($event)"></pop-over>
		<event-gen></event-gen>
	`,
	providers: []
})
export class App {

	popover:any = {component:'', paramObj:{}, show:false}
	private subscription: Subscription;
	constructor(private messageService : MessageService) {
		this.subscribe();
	}

	subscribe() {
		this.subscription = this.messageService.subscribe('receiver', (payload) => {
			console.log("subscription.....")
			console.log(payload);
			this.popover.component = payload.component;
			this.popover.show = true;
			switch(payload.component){
				case "popup1":

				break;
				case "popup2":
				break;
			}
		});
	}

	popoverDisplay(ev){
		console.log("popoverDisplay");
		console.log(ev);
		this.popover.show = ev;
	}
}

@NgModule({
	imports: [ BrowserModule, PopOverModule, EventGenComponentModule ],
	declarations: [ App ],
	bootstrap: [ App ],
	providers: [ MessageService ]
})
export class AppModule {}
