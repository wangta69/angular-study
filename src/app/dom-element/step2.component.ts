import { Component} from '@angular/core';
@Component({
  selector: 'app-root',
  template:`<span [appHighlight]="'highlight'">I am pondol.</span>
  <span>I am a web developer.</span>`,
  styles:[`[highlight]{background: green; color: white;}`]
})
export class DomComponent2{}