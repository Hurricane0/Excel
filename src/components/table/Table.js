import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { handleResize } from './table.resize';
import { shouldResize } from './table.functions';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable();
  }

  init() {
    super.init();
    this.selection = new TableSelection();
    this.$cell = this.$root.find('[data-id="0:0"]');
    this.selection.select(this.$cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      handleResize(this.$root, event);
    }
  }
}
