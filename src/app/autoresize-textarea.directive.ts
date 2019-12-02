import { Directive } from '@angular/core';

@Directive({
  selector: '[appAutoresizeTextarea]'
})
export class AutoresizeTextareaDirective {

  constructor() { }

}
// An autoresize directive that works with ion-textarea in Ionic 3
// Based on https://www.npmjs.com/package/angular2-autosize


// import { Directive, HostListener, ElementRef, Input } from '@angular/core';
//
// @Directive({
//     selector: 'ion-textarea[autoresize]' // Attribute selector
// })
// export class AutoresizeDirective {
//
//     constructor(public element: ElementRef) {
//     }
//
//     @Input('autoresize') maxHeight: number;
//
//     @HostListener('input', ['$event.target'])
//     onInput(textArea: HTMLTextAreaElement): void {
//         this.adjust();
//     }
//
//     ngOnInit(): void {
//         this.adjust();
//     }
//
//     adjust(): void {
//         let ta = this.element.nativeElement.querySelector('textarea'),
//             newHeight;
//
//         if (ta) {
//             ta.style.overflow = 'hidden';
//             ta.style.height = 'auto';
//             if (this.maxHeight) {
//                 console.log('this.maxHeight', this.maxHeight);
//                 newHeight = Math.min(ta.scrollHeight, this.maxHeight);
//                 console.log('newHeight', newHeight);
//             } else {
//                 newHeight = ta.scrollHeight;
//             }
//             ta.style.height = newHeight + 'px';
//         }
//     }
//
// }
//
