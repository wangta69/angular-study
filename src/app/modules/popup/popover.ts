import { Component, NgModule, ViewChild, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, Input, Output, EventEmitter} from '@angular/core';
import { FormsModule }					from '@angular/forms';
import { MaterialModule }				from '@angular/material';
import { CommonModule }					from "@angular/common";

import { Popup1Module, Popup1Component }		from './popup1';
import { Popup2Module, Popup2Component }		from './popup2';


@Component({
	selector: 'pop-over',
	template: `
	<div #container (popclosed)="closePopover($event)"></div>
	`
})

export class PopOverComponent {
	@ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
	component;
	componentData;
	currentComponent;
	showflag = false;
	inputObj:any;

	//@Input()  componet:string;


	@Output() show = new EventEmitter<boolean>();

	@Input('component') set mycomponent(value: string) {
		this.component = value;
			this.changed();
	}

	@Input('show') set myshow(value: boolean) {
		this.showflag = value;
			this.changed();
	}

	@Input('paramObj') set myparamObj(value: any) {
		this.inputObj = value;
		this.changed();
	}


	constructor(private resolver: ComponentFactoryResolver) {}

	/**
	* Listen close Event From Child
	*/
	closePopover(){
		this.currentComponent.destroy();
		this.showflag	= false;
		this.show.emit(false);
	}

	changed(){
		if(this.showflag && typeof this.component != 'undefined'){
			this.create();
		}
	}

	create() {

		switch(this.component){
			case "popup1"://
				this.componentData = {
					component: Popup1Component,
					inputs: {
						inputObj: this.inputObj
					}
				};
			break;
			case "popup2"://
				this.componentData = {
					component: Popup2Component,
					inputs: {
						inputObj: this.inputObj
					}
				};
			break;
		}

		if(!this.componentData.component)
			return;
		// Inputs need to be in the following format to be resolved properly
		let inputProviders = Object.keys(this.componentData.inputs).map((inputName) => { return { provide: inputName, useValue: this.componentData.inputs[inputName] }; });
		let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

		// We create an injector out of the data we want to pass down and this components injector
		let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector);
		// We create a factory out of the component we want to create
		let factory = this.resolver.resolveComponentFactory(this.componentData.component);

		// We create the component using the factory and the injector
		let component = factory.create(injector) as any;//You must defind type as any to avoid error from component.instance.popclosed

		// We insert the component into the dom container
		this.container.insert(component.hostView);

		// We can destroy the old component is we like by calling destroy
		if (this.currentComponent) {
			this.currentComponent.destroy();
		}

		this.currentComponent = component;

		//close popover listen
		component.instance.popclosed.subscribe(() => this.closePopover());

	}

}

@NgModule({
	declarations: [ PopOverComponent ],
	imports: [ Popup1Module, Popup2Module ],
	exports: [ PopOverComponent ],
	providers: [  ],
	entryComponents: [ Popup1Component,Popup2Component ] /* PopOverComponent */
})
export class PopOverModule { }
