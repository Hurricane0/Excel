import { $ } from '../dom';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;

    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler);
  }

  changePageHandler(event) {}

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
