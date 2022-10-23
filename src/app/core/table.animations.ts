import { trigger, animate, style, state, transition, group } from '@angular/animations';

const commonStyles = {
  border: '4px solid black',
  color: 'white'
}
export const HighlightTrigger = trigger('rowHighlight', [
  state('selected', style([commonStyles, {
    backgroundColor: 'lightgreen',
    fontSize: '20px'
  }])),
  state('notselected', style([commonStyles, {
    backgroundColor: 'lightsalmon',
    fontSize: '22px',
    color: 'black'
  }])),
  state('void', style({
    opacity: 0
  })),
  transition('* => notselected', animate('200ms')),
  transition('* => selected',
    [
      animate(
        '400ms 200ms ease-in',
        style({
          backgroundColor: 'lightblue',
          fontSize: '25px'
        })),
        group([
          animate('250ms', style({
            backgroundColor: 'lightcoral',
          })),
          animate('450ms', style({
            fontSize: '30px'
          }))
        ]),
      animate('200ms')
    ]
  ),
  transition('void => *', animate('500ms'))
]);
