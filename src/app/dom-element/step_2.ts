@Component({
  selector: 'app-root',
  template:`<span [appHighlight]="'highlight'">I am manoj.<span>
  <span>I am a web developer.</span>`,
  styles:[`[highlight]{background: green; color: white;}`]
})
export class AppComponent{}