import { trigger, state, transition, style, animate, keyframes, animation, useAnimation } from '@angular/animations';

export let expandAnimation = animation([
    animate('.5s', style({opacity: 1, display: 'block'}))
]);

export let collapseAnimation = animation([
    animate('.5s', style({opacity: 0, display: 'none'}))
]);
