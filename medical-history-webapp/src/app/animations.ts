import {trigger, animate, transition, style, keyframes} from '@angular/animations';

export const showInOutAnimation = trigger('showInOut', [

  transition('void => *', [
    animate(200, keyframes([
      style({opacity: 0}),
      style({opacity: 1}),
    ]))
  ]),
  transition('* => void', [
    animate(200, keyframes([
      style({opacity: 1}),
      style({opacity: 0}),
    ]))
  ])
]);
