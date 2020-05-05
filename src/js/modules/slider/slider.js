export default class Slider {
  constructor({container = null,
                btns = null,
                prev = null,
                next = null,
                active = null,
                animated = null,
                autoPlay = false} = {}) {
    this.container = document.querySelector(container);
    try {this.slides = this.container.children;} catch (e) {}
    this.btns = document.querySelectorAll(btns);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.active = active;
    this.animated = animated;
    this.autoPlay = autoPlay;
    this.slideIndex = 1;
  }

}