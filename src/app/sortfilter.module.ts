import {Component, NgModule, VERSION} 	from '@angular/core'
import {BrowserModule} 					from '@angular/platform-browser'
import { BrowserAnimationsModule }		from '@angular/platform-browser/animations';
import { MaterialModule }				from '@angular/material';
import { FilterModule }					from './modules/filter/filter.common';

@Component({
	selector: 'app-root',
	template: `
	<h2>{{name}}</h2>

		<button (click)="filterVal = 'M'">Men</button><button (click)="filterVal = 'W'">Women</button><button (click)="filterVal = ''">Reset</button>
		<br />
		<button (click)="orderVal = 'asc'">Age asc</button><button (click)="orderVal = 'desc'">Age desc</button><button (click)="orderVal = ''">Reset</button>

		<p *ngFor="let member of members | filter:'gender':filterVal| sortBy: sortVal : orderVal; let i  = index">{{member.age}}/{{member.name}}/{{member.gender}}</p>



		`,
})


export class App {
	name;
	members = [
		{age:12, name:'abc1', gender:'M'}
		,{age:13, name:'abc2', gender:'W'}
		,{age:14, name:'abc3', gender:'W'}
		,{age:13, name:'abc4', gender:'M'}
		,{age:12, name:'abc5', gender:'M'}
	]
	filterVal = '';
	sortVal = 'age'


	constructor() {
		//console.log(VERSION);
		this.name = VERSION.full;
	}


}

@NgModule({
	imports: [ BrowserModule, MaterialModule, BrowserAnimationsModule, FilterModule ],
	declarations: [ App ],
	bootstrap: [ App ],
	providers: [  ]
})
export class AppModule {}
