import { Page } from '../core/page/Page';
import { Excel } from '../components/excel/Excel';
import { Formula } from '../components/formula/Formula';
import { Header } from '../components/header/Header';
import { Toolbar } from '../components/toolbar/Toolbar';
import { Table } from '../components/table/Table';
import { createStore } from '../core/store/createStore';
import { rootReducer } from '../redux/rootReducer';
import { storage } from '../core/utils';
import { normalizeInitialState } from '../redux/initialState';
import { StateProcessor } from '../core/page/StateProcessor';

function storageName(param) {
  return 'excel:' + param;
}

class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return new Promise(resolve => {
      const state = storage(this.name);
      setTimeout(() => {
        resolve(state);
      }, 2500);
    });
  }
}

export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.processor = new StateProcessor(new LocalStorageClient(this.params));
  }

  async getRoot() {
    const state = await this.processor.get();
    const store = createStore(rootReducer, normalizeInitialState(state));

    this.storeSub = store.subscribe(this.processor.listen);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
    this.storeSub.unsubscribe();
  }
}
