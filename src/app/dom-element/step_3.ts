constructor( private element: ElementRef,
private renderer: Renderer2) { }

ngOnInit(){
    this.renderer.setAttribute(this.element.nativeElement,this.appHighlight, '')
}