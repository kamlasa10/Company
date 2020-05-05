export default class Difference {
  constructor(officeOld, officeNew, items) {
   try {
     this.officeOld = document.querySelector(officeOld);
     this.oldItems = this.officeOld.querySelectorAll(items);
     this.officeNew = document.querySelector(officeNew);
     this.newItems = this.officeNew.querySelectorAll(items);
     this.oldCounter = 0;
     this.newCounter = 0;
     this.oldPlus = this.officeOld.querySelector('.plus');
     this.newPlus = this.officeNew.querySelector('.plus');
   } catch (e) {}
  }

  hideItems(items) {
    try {
      items.forEach((item, i, arr) => {
        if(i !== arr.length - 1) {
          item.classList.remove('fadeInDown');
          item.style.display = 'none';
        }
      });
    } catch (e) {}
  };

  showItems(trigger, items, idx) {
    try {
      this.hideItems(items);
      trigger.addEventListener('click', () => {
        items[idx].classList.add('animated', 'fadeInDown');
        items[idx].style.display = 'flex';
        ++idx;

        if(idx === items.length - 1) {
          trigger.parentElement.parentElement.remove();
        }
      })
    } catch (e) {}
  }

  init() {
    try {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);

      this.showItems(this.oldPlus, this.oldItems, this.oldCounter);
      this.showItems(this.newPlus, this.newItems, this.newCounter);
    } catch (e) {}
  }
}