const CODES = {
  A: 65,
  Z: 90,
};

function toCol(letter) {
  return `
    <div class="column">${letter}</div>
  `;
}
function toCell() {
  return `
    <div class="cell" contenteditable>B1</div>
  `;
}

function toRow(content = '', number = '') {
  return `
    <div class="row">
      <div class="row-info">${number}</div>
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
