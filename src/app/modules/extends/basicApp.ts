import { Injector, ReflectiveInjector, NgZone} 	from '@angular/core'; //
import { TestService }						from './testService';
export class MyApp{//

    protected _injector:Injector;
    protected _testService:TestService;

	constructor( protected injector: Injector) {
    /*constructor( protected testService: TestService ) { */
        /*


        TestService에서 constructor에 아무것도 없을 경우 OK, 현재 constructor에서 injector를 하지 않을 경우
        let providers = ReflectiveInjector.resolve([TestService]);
        this._injector = ReflectiveInjector.fromResolvedProviders(providers);
        */

        this._testService = this.injector.get(TestService);
        this._testService.callService();


        //this.testService.callService();
        //this.testService.show();
	}

    get testService(): TestService {
        if (this._testService == null) {
            this._testService = this._injector.get(TestService);
        }
        console.log("getTestService start")
        return this._testService;
    }

}
