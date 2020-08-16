import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appValveColor]'
})
export class ValveColorDirective {

  @Input() appValveColor: number;

  constructor(private el: ElementRef) {
  }

  ngOnInit(){
    this.textColor(this.appValveColor);
 }

  private textColor(state: number) {
    if(state == 1)
      this.el.nativeElement.style.color = 'blue';
    else
      this.el.nativeElement.style.color = 'green';
  }

}
