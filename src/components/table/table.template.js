const CODES = {
  A: 65,
  Z: 90,
};

function toCol(letter, index) {
  return `
    <div class="column" data-type="resizable" data-col=${index}>
      ${letter}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}
function toCell(row, col) {
  return `
    <div class="cell"
      contenteditable
      data-col="${col}" 
      data-id="${row}:${col}"
      data-type="cell"
    ></div>
  `;
}

function toRow(content = '', index = '') {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;

  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(toCol).join('');

  rows.push(toRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map((_, col) => toCell(row, col))
      .join('');
    rows.push(toRow(cells, row + 1));
  }

  return rows.join('');
}
