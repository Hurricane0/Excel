export function toHTML(params) {
  return `
    <li class="db__record">
      <a href="#">Таблица номер 1</a>
      <strong>3.05.2020</strong>
    </li>
  `;
}

// excel:123125
export function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key.includes('excel')) {
      continue;
    }

    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>Create your first table</p>`;
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
}