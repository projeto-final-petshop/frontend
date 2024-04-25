import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCpfFormat]'
})
export class CpfFormatDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\D/g, '');
    if (trimmed.length > 11) {
      trimmed = trimmed.substr(0, 11);
    }

    const parts = [];
    let mask = 'xxx.xxx.xxx-xx';
    let i = 0;
    let char = mask.charAt(i);

    for (const c of trimmed) {
      if (i >= mask.length) {
        break;
      }

      while (char !== 'x') {
        parts.push(char);
        i++;
        char = mask.charAt(i);
      }
      
      parts.push(c);
      i++;
      char = mask.charAt(i);
    }

    this.el.nativeElement.value = parts.join('');
    event.preventDefault();
  }

}
