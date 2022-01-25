import {transition, animate, style, trigger, query, animateChild} from '@angular/animations';

export class ModalAnimation {
  
  public static modalAnimation = trigger('modalAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.95)' }),
      animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
    ])
  ]);
  
  public static modalBackgroundAnimation = trigger('modalBackgroundAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-out', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ opacity: 0 }))
    ])
  ])
  
  public static waitEndModalAnimation = trigger('waitEndModalAnimation', [
    transition(':leave', [
      query('@*', animateChild())
    ])
  ]);
  
}