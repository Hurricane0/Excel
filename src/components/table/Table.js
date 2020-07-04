import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '../../core/dom';

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

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const colNumber = $parent.getDataset().col;
      const cells = this.$root.findAll(`[data-col="${colNumber}"]`);
      const type = $resizer.getDataset().resize;
      const sideProp = type === 'col' ? 'bottom' : 'right';
      let value;
      $resizer.css({ opacity: 1, [sideProp]: '-3000px' });

      document.onmousemove = e => {
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          value = coords.width + delta;
          $resizer.css({ right: -delta + 'px' });
        } else {
          const delta = e.pageY - coords.bottom;
          value = coords.height + delta;
          $resizer.css({ bottom: -delta + 'px' });
        }
      };

      document.onmouseup = () => {
        $resizer.css({
          opacity: 0,
          bottom: '0',
          right: '0',
        });

        if (type === 'col') {
          $parent.css({ width: value + 'px' });
          cells.forEach(el => {
            el.style.width = value + 'px';
          });
        } else {
          $parent.css({ height: value + 'px' });
        }

        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
}
