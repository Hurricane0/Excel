const CODES = {
  A: 65,
  Z: 90,
};

function toCol(letter) {
  return `
    <div class="column">
      ${letter}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}
function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `;
}

function toRow(content = '', index = '') {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';
  return `
    <div class="row">
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

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('');
    rows.push(toRow(cells, i + 1));
  }

  return rows.join('');
}
