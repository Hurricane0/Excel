import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { handleResize } from './table.resize';
import { shouldResize, isCell } from './table.functions';
import { TableSelection } from './TableSelection';
import { $ } from '../../core/dom';
import { matrix, nextSelector } from '../../core/utils';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', text => this.selection.current.text(text));
    this.$on('formula:done', () => this.selection.current.focus());

    this.$subscribe(state => {
      console.log('Table state', state);
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  async resizeTable(event) {
    try {
      const data = await handleResize(this.$root, event);
      this.$dispatch({ type: 'TABLE_RESIZE', data });
    } catch (error) {
      console.warn('Resize error', error.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix(this.selection.current, $target).map(id =>
          this.$root.find(`[data-id="${id}"]`)
        );

        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowDown',
      'ArrowUp',
    ];

    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text());
  }
}
