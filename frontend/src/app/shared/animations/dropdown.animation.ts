import { transition, animate, trigger, style } from '@angular/animations';

export class DropdownAnimation {
  public static dropdownAnimation = trigger('dropdownAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0,95)' }),
      animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1,100)' })),
    ]),
    transition(':leave', [
      animate('75ms ease-in', style({ opacity: 0, transform: 'scale(0,95)' })),
    ]),
  ])
}