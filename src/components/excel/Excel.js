export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  render() {
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>hello</h1>');
    const node = document.createElement('h1');
    node.textContent = 'Excel';
    this.$el.append(node);
  }
}
