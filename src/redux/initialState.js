import { storage } from '../core/utils';
import { defaultStyles } from '../constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyle: defaultStyles,
};

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState;
