import { Component, NgModule, ViewChild, OnChanges,  SimpleChanges, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, Input, Output, EventEmitter} from '@angular/core';
import { FormsModule }					from '@angular/forms';
import { MaterialModule }				from '@angular/material';
import { CommonModule }					from "@angular/common";

import { Dynamic1Module, Dynamic1Component }		from './component1';
import { Dynamic2Module, Dynamic2Component }		from './component2';


@Component({
	selector: 'dynamiccontainer',
	template: `
	<div #container (popclosed)="closePopover($event)"></div>
	`
})

export class DynamicComponent implements OnChanges {
	@ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
	;
	componentData:any = {};
	targetComponent
	currentComponent;

	inputObj:any;

	@Input()  component:string;
	@Output() show = new EventEmitter<boolean>();


	constructor(private resolver: ComponentFactoryResolver) {}

	ngOnChanges(changes: SimpleChanges) {
		 for (let propName in changes) {
			 let changedProp = changes[propName];
			 if(propName == "component"){
				let component	= changedProp.currentValue;
				switch(component){
					case "component_1":
						this.targetComponent = Dynamic1Component
					break;
					case "component_2":
						this.targetComponent = Dynamic2Component
					break;
				}
				if(this.targetComponent)
					this.callComponent();
			 }
		 }
	}


	private callComponent() {
		// Inputs need to be in the following format to be resolved properly
		let inputProviders = Object.keys(this.componentData).map((inputName) => { return { provide: inputName, useValue: this.componentData[inputName] }; });
		let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

		// We create an injector out of the data we want to pass down and this components injector
		let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector);
		// We create a factory out of the component we want to create
		let factory = this.resolver.resolveComponentFactory(this.targetComponent);

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
		//component.instance.popclosed.subscribe(() => this.closePopover());

	}

	/**
	* Listen close Event From Child
	*/
	closePopover(){
		this.currentComponent.destroy();
	}

}

@NgModule({
	declarations: [ DynamicComponent ],
	imports: [ Dynamic1Module, Dynamic2Module ],
	exports: [ DynamicComponent ],
	providers: [  ],
	entryComponents: [ DynamicComponent, Dynamic1Component, Dynamic2Component ]
})
export class DynamicModule { }
