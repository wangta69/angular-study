import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {MessageService} from './modules/globalevent/message.service'
import {SocketService} from './modules/socket/socket.service'
import {ChatTab1 } from './modules/socket/tab1'
import {ChatTab2 } from './modules/socket/tab2'

@Component({
	selector: 'app-root',
	template: `
		<tab1 [selectedGameIndex]="selectedGameIndex"></tab1>
		<tab2 [selectedGameIndex]="selectedGameIndex"></tab2>


		<button (click)="chtab(0)">click tab1</button>
		<button (click)="chtab(1)">click tab2</button>
	`,
	providers: [MessageService]
})
export class App {
	selectedGameIndex:number = 0;

	constructor() {

	}

	chtab(n){
		console.log("chtab", n)
		this.selectedGameIndex = n;
	}
}

@NgModule({
	imports: [ BrowserModule, ChatTab1, ChatTab2 ],
	declarations: [ App ],
	bootstrap: [ App ],
	providers:[SocketService]
})
export class AppModule {}
