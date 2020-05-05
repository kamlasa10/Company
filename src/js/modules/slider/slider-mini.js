import Slider from "./slider";

export default class SliderMini extends Slider {
  constructor(container, prev, next, active, animated, autoPlay) {
    super(container, prev, next, active, animated, autoPlay);
  }

  bindSlides() {
    try {
      this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `
    } catch (e) {}
  }

  animateSlide() {
    try {
      this.slides.forEach((item) => {
        item.querySelector('.card__title').style.opacity = '0.4';
        item.querySelector('.card__controls-arrow').style.opacity = '0';
      });

      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    } catch (e) {}
  }

  showedUpSlide() {
   try {
     this.slides.forEach((item) => {
       item.classList.remove(this.active);
     });

     if (!this.slides[0].closest('button')) {
       this.slides[0].classList.add(this.active);
     }
   } catch (e) {}
  }

  bindTrigger() {
    try {
      this.next.addEventListener('click', () => {
        if (this.slides[1].nodeName === 'BUTTON' && this.slides[2].nodeName === 'BUTTON') {
          this.container.appendChild(this.slides[0]);
          this.container.appendChild(this.slides[0]);
          this.container.appendChild(this.slides[0]);
        } else if (this.slides[1].tagName === 'BUTTON') {
          this.container.appendChild(this.slides[0]);
          this.container.appendChild(this.slides[1]);
        } else {
          this.container.appendChild(this.slides[0]);
        }
        this.showedUpSlide();

        if (this.animated) {
          this.animateSlide();
        }
      });

      this.prev.addEventListener('click', () => {
        for(let i = this.slides.length - 1; i> 0; i--) {
          if(this.slides[i].tagName !== 'BUTTON') {
            let active = this.slides[i];
            this.container.insertBefore(active, this.slides[0]);

            this.showedUpSlide();

            if (this.animated) {
              this.animateSlide();
            }
            break;
          }
        }
      });
    } catch (e) {}
  }

  init() {
    this.bindTrigger();

    this.showedUpSlide();
    this.bindSlides();

    if(this.animated) {
      this.animateSlide();
    }

    if (this.autoPlay && this.container) {
      setInterval(() => {
        this.container.appendChild(this.slides[0]);
        this.animateSlide();
      }, 5000)
    }
  }
}