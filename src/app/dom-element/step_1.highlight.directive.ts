@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit{

  @Input() appHighlight;

  constructor( private element: ElementRef) { }

  ngOnInit(){
    this.element.nativeElement.setAttribute(this.appHighlight, '');
  }
}