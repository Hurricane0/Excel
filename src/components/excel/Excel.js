export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = document.createElement('div');
    this.components.forEach(Component => {
      const component = new Component();
      $root.insertAdjacentHTML('beforeend', component.toHTML());
    });
    return $root;
  }

  render() {
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>hello</h1>');
    // const node = document.createElement('h1');
    // node.textContent = 'Excel';
    this.$el.append(this.getRoot());
  }
}
