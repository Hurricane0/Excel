import './scss/index.scss';
import { Excel } from './components/excel/Excel';
import { Formula } from './components/formula/Formula';
import { Header } from './components/header/Header';
import { Toolbar } from './components/toolbar/Toolbar';
import { Table } from './components/table/Table';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, {});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
