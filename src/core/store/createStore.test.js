import { createStore } from './createStore';

const reducer = (state = 0, action) => {
  if (action.type === 'ADD') {
    return ++state;
  }
  return state;
};

describe('Create Store:', () => {
  test('should return store object', () => {
    const store = createStore(reducer);
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).toBeDefined();
  });
});
