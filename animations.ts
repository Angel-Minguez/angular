import { animate, state, style, transition, trigger } from '@angular/core';

export function routerTransition(){
   return slideToLeft();
}
function slideToLeft() {
  return trigger('routerTransition', [
    state('void', style({position:'absolute'}) ),
    state('*', style({position:'absolute'}) ),
    transition(':enter', [  
      style({transform: 'translateX(-100%)',opacity:'0'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)', opacity: '1'}))
    ]),
    transition(':leave', [ 
      style({transform: 'translateX(0%)',opacity:'1'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)', opacity:'0'}))
    ])
  ]);
}