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

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (Element.prototype.append) {
      this.$el.append(node.$el);
    } else {
      this.$el.appendChild(node.$el);
    }
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
