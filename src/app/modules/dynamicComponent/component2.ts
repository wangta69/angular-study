import {NgModule, Component}	from '@angular/core';


//import { NavParams } from 'ionic-angular';
@Component({
	template: `called component2`
})
export class Dynamic2Component {
	constructor( ) {//private navParams: NavParams
	}
}


@NgModule({
declarations: [ Dynamic2Component ],
imports: [  ],
exports:[ Dynamic2Component]
})
export class Dynamic2Module{}
