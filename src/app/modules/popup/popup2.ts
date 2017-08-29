import {NgModule, Component, EventEmitter, Output}	from '@angular/core';


import { CommonModule }		from "@angular/common";
import { MaterialModule }	from '@angular/material';



//import { NavParams } from 'ionic-angular';
@Component({
	template: `
		<div class="popover">
			<div class="bar-header">
				<h1>팝업2</h1>
				<a (click)="closePopover()">close</a>
			</div>


			<div class="pop-body">
				 팝업 body가 이곳에 들어옮
			</div>
			<div class="pop-footer">
				<button md-button class="full btn_create" (click)="clicked()">Click</button>
			</div>

		</div>
	`

})	//template: `탭플리트를 생성해 보자`,

export class Popup2Component {
	@Output() popclosed		= new EventEmitter();

	constructor( ) {//private navParams: NavParams
	}


	clicked(){
		console.log('clicked');
	};

	closePopover(){
		//현재 팝업창 닫기 ()
		this.popclosed.emit();
	}
}

@NgModule({
declarations: [ Popup2Component ],
imports: [ MaterialModule ],
exports:[ Popup2Component, CommonModule]
})
export class Popup2Module{}
