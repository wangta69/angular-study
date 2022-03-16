import { NgModule }                        from '@angular/core';
import { MatDatepickerModule,   } from '@angular/material/datepicker'; // MatCommonModule, NativeDateAdapter, DateAdapter, MD_DATE_FORMATS

class AppDateAdapter  { // extends NativeDateAdapter

    format(date: Date, displayFormat: Object): string {

        if (displayFormat === 'input') {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        } else {
            return date.toDateString();
        }
    }
}

const APP_DATE_FORMATS = {
    parse: {
        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
    },
    display: {
        // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        dateInput: 'input',
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
         monthYearA11yLabel: {year: 'numeric', month: 'long'},
   }
};

@NgModule({
    declarations:    [ ],
    imports:        [ ],
    // exports:        [ MatDatepickerModule, MatNativeDateModule ],
    providers: [
        {
            // provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            // provide: MD_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})

export class DatePickerModule {

}
