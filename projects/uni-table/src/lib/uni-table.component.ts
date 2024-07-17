import {Component, Input} from '@angular/core';

@Component({
  selector: 'uni-table',
  template: `
    <p>
      You first name is : {{firstName}}
    </p>
  `,
  styles: ``
})
export class UniTableComponent {
  @Input() firstName?: string;


}
