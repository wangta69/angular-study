import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {MessageService} from './modules/globalevent/message.service'
import {SenderModule } from './modules/globalevent/sender'
import {ReceiverModule } from './modules/globalevent/receiver'

@Component({
	selector: 'app-root',
	template: `
		<sender></sender>
		<receiver></receiver>
	`,
	providers: [MessageService]
})
export class App {
	name:string;
	constructor() {
		this.name = 'Angular4'
	}
}

@NgModule({
	imports: [ BrowserModule, ReceiverModule, SenderModule ],
	declarations: [ App ],
	bootstrap: [ App ]
})
export class AppModule {}
