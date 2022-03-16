import {Component, NgModule, VERSION,  ReflectiveInjector}     from '@angular/core'//NgZone,
import { CommonModule }                            from '@angular/common';
import {BrowserModule}                             from '@angular/platform-browser'
import { BrowserAnimationsModule }                from '@angular/platform-browser/animations';
import { FormsModule }                            from '@angular/forms';
// import { DatePickerModule }                        from './modules/date.picker/datepicker.module';

@Component({
    selector: 'app-root',
    template: ``,
        // <input (click)="picker.open()" [mdDatepicker]="picker" placeholder="Choose a date" [(ngModel)]="datepicker.SearchDate">
        // <md-datepicker-toggle mdSuffix [for]="picker"></md-datepicker-toggle>
        // <md-datepicker #picker touchUi="true"></md-datepicker>

})


export class App{
    datepicker = {SearchDate:new Date()}
    constructor( ) {}

}

@NgModule({
    declarations: [ App ],
    imports: [ CommonModule, BrowserModule, BrowserAnimationsModule, FormsModule], // , DatePickerModule
    bootstrap: [ App ],
    providers: [   ]//NgZone
})
export class AppModule {}
