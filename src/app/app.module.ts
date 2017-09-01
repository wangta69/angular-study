import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { DynamicModule } from './modules/dynamicComponent/dynamic'

@Component({
	selector: 'app-root',
	template: `
		<dynamiccontainer [component]='mycomponent'></dynamiccontainer>
		<button (click)="callComponent('component_1')">call 1</button>
		<button (click)="callComponent('component_2')">call 2</button>
		`,
})
export class App {
	mycomponent:string = 'component_1'
	constructor() {	}

	callComponent(component){
		this.mycomponent = component;
	}
}

@NgModule({
	imports: [ BrowserModule, DynamicModule ],
	declarations: [ App ],
	bootstrap: [ App ],
	providers: [  ]
})
export class AppModule {}
