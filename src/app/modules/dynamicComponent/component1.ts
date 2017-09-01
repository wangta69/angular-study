import {NgModule, Component}	from '@angular/core';


//import { NavParams } from 'ionic-angular';
@Component({
	template: `called component1`
})
export class Dynamic1Component {
	constructor( ) {//private navParams: NavParams
	}
}


@NgModule({
declarations: [ Dynamic1Component ],
imports: [  ],
exports:[ Dynamic1Component]
})
export class Dynamic1Module{}
