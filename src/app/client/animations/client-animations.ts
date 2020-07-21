import {animate, style, transition, trigger} from '@angular/animations';

export const slideInAnimation = trigger('slideIn', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(-300px)'}),
    animate('200ms', style({opacity: 1, transform: 'none'}))
  ])
]);
