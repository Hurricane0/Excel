class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML;
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  clear() {
    this.html('');
    return this;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  append(node) {
    if (Element.prototype.append) {
      this.$el.append(node.$el);
    } else {
      this.$el.appendChild(node.$el);
    }
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  get data() {
    return this.$el.dataset;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key];
    });
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s];
      return res;
    }, {});
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split('');
      return {
        row: +parsed[0],
        col: +parsed[2],
      };
    }
    return this.$el.dataset.id;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName = 'div', className = '') => {
  const el = document.createElement(tagName);

  if (className) {
    el.classList.add(className);
  }

  return $(el);
};
