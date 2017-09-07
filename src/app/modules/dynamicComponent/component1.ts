import {NgModule, Component, EventEmitter, Output}	from '@angular/core';


//import { NavParams } from 'ionic-angular';
@Component({
	template: `
	called component1
	<a (click)="closePopover()">close</a>
	`
})
export class Dynamic1Component {
	@Output() popclosed = new EventEmitter();
	constructor( ) {//private navParams: NavParams
	}

	closePopover(){
		console.log("closePopover start");
		this.popclosed.emit();
	}
}


@NgModule({
declarations: [ Dynamic1Component ],
imports: [  ],
exports:[ Dynamic1Component]
})
export class Dynamic1Module{}
