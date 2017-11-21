import { Injectable, ReflectiveInjector, Injector, NgZone, }			from '@angular/core';//



@Injectable()
export class TestService {
//    protected _injector:Injector;
    protected zone:NgZone;

	constructor(protected injector: Injector) {

        this.zone = this.injector.get(NgZone);

        this.zone.run(() =>console.log("zone run"));

        //let providers = ReflectiveInjector.resolve([NgZone]);
        //this._injector = ReflectiveInjector.fromResolvedProviders(providers);
	}

    callService(){
        console.log("TestService.call")
    }
/*
    get testService(): TestService {
        if (this._zone == null) {
            this._zone = this._injector.get(TestService);
        }
        console.log("getTestService start")
        return this._zone;
    }
*/
}
