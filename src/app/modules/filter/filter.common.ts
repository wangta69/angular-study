import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter',
	pure: false
})
//<p *ngFor="let member of members | filter:'gender':filterVal| sortBy: sortVal : orderVal; let i  = index">{{member.age}}/{{member.name}}/{{member.gender}}</p>
export class FilterPipe implements PipeTransform {
	transform(items: any[], key:string, value): any {
		return value
			? items.filter(item => eval("item."+key+".indexOf(value) !== -1"))
			: items;

	}
}

@Pipe({
	name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
	transform(items: any[], sortedBy: string, orderBy:string): any {

		return orderBy == 'asc'
			 ? items.sort((b, a) => {return b[sortedBy] - a[sortedBy]})
			 : items.sort((a, b) => {return b[sortedBy] - a[sortedBy]})
	}
}

@NgModule({
	declarations:	[ FilterPipe, SortByPipe ],
	exports:		[ FilterPipe, SortByPipe ],
})
export class FilterModule { }
