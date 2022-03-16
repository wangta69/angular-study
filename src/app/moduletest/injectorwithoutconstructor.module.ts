import {Component, NgModule, VERSION,  Injector, NgZone, ReflectiveInjector} 	from '@angular/core'//NgZone,
import {BrowserModule} 					from '@angular/platform-browser'
import { BrowserAnimationsModule }		from '@angular/platform-browser/animations';
import { MaterialModule }				from '@angular/material';
import { FilterModule }					from './modules/filter/filter.common';
import { MyApp }						from './modules/extends/basicApp';
import { TestService }						from './modules/extends/testService';
@Component({
	selector: 'app-root',
	template: `

		call;;;;
			`,
})


export class App extends MyApp {
/*
	constructor( protected testService: TestService) {
		super(testService);
	}

	*/

	constructor( protected injector: Injector) {
		super(injector);
	}

}

@NgModule({
	imports: [ BrowserModule, MaterialModule, BrowserAnimationsModule, FilterModule ],
	declarations: [ App ],
	bootstrap: [ App ],
	providers: [  TestService ]//NgZone
})
export class AppModule {}
