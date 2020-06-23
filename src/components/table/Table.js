import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'click'],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    console.log(event.target);
  }

  onClick() {
    console.log(event.target);
  }
}
