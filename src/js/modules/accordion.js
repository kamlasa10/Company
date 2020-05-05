export default class Accordion {
  constructor(trigger) {
    this.triggers = document.querySelectorAll(trigger);
  }

  bindTrigger() {
    this.triggers.forEach((item) => {
    item.addEventListener('click', () => {
      const msg = item.parentElement.nextElementSibling;

      if(msg.style.display === 'block') {
        msg.classList.remove('fadeInUp');
        msg.style.display = 'none';
      } else {
        msg.style.display = 'block';
        msg.classList.add('animated', 'fadeInUp');
      }
    })
    })
  }

  init() {
    this.bindTrigger();
  }

};