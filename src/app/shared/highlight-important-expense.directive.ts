import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightImportantExpense]'
})
export class HighlightImportantExpenseDirective {

  @Input() expenseAmount!: number;
  @Input() seuil!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (Math.abs(this.expenseAmount) > this.seuil) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ffcccb');
    }
  }

}
