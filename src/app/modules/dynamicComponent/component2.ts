import {NgModule, Component, EventEmitter, Output}	from '@angular/core';


//import { NavParams } from 'ionic-angular';
@Component({
	template: `called component2
	<a (click)="closePopover()">close</a>
	`
})
export class Dynamic2Component {
	@Output() popclosed = new EventEmitter();
	constructor( ) {//private navParams: NavParams
	}

	closePopover(){
		console.log("closePopover start");
		this.popclosed.emit();
	}
}


@NgModule({
declarations: [ Dynamic2Component ],
imports: [  ],
exports:[ Dynamic2Component]
})
export class Dynamic2Module{}
