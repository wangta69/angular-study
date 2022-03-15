@Component({
  selector: 'app-root',
  template:`<span #el>I am manoj.</span>
  <span>I am a web developer.</span>`,
  styles:[`[highlight]{background: green; color: white}`]
})
export class AppComponent implements AfterViewInit{
  @ViewChild('el') span:ElementRef;

  ngAfterViewInit(){
    this.span.nativeElement.setAttribute('highlight', '');
  }
}