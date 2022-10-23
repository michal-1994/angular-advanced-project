import { trigger, animate, style, state, transition, group } from '@angular/animations';
import { getStylesFromClasses } from './animationUtils';

export const HighlightTrigger = trigger('rowHighlight', [
  state('selected', style(getStylesFromClasses(['bg-success', 'h4']))),
  state('notselected', style(getStylesFromClasses(['bg-info']))),
  state('void', style({
    transform: 'translateX(-50%)'
  })),
  transition('* => notselected', animate('200ms')),
  transition('* => selected',
    [
      animate(
        '400ms 200ms ease-in',
        style({
          backgroundColor: 'lightblue',
          fontSize: '20px'
        })
      ),
      animate('200ms')
    ]
  ),
  transition('void => *', animate('500ms'))
]);
