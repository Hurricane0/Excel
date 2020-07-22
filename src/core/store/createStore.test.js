import { createStore } from './createStore';

describe('Test', () => {
  test('Should Create Store:', () => {
    const store = createStore(() => {}, {});
    expect(store).toBeDefined();
  });
});
