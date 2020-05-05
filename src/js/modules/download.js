export default class Download {
  constructor(trigger) {
    this.trigger = document.querySelectorAll(trigger);
    this.path = 'assets/icons/download.svg';
  }

  createBtn(file, item) {
    const element = document.createElement('a');
    element.setAttribute('href', this.path);
    element.setAttribute('download', file);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    element.remove();
  }

  init() {
    this.trigger.forEach((item) => {
      item.addEventListener('click', (e) => {
        const filename = "GFG.txt";

        this.createBtn(filename,item);
      })
    })
  }
}