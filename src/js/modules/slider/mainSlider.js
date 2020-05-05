import Slider from "./slider";

export default class MainSlider extends Slider {
  constructor(container, next, prev) {
    super(container);
    this.next = document.querySelectorAll(next);
    this.prev = document.querySelectorAll(prev);
  }

  showSlides(n) {
    if (this.container) {
      if (n > this.slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = this.slides.length;
      }

      try {
        this.hanson.style.display = 'none';
        if (this.slideIndex === 3) {
          setTimeout(() => {
            this.hanson.style.display = 'block';
            this.hanson.classList.add('animated', 'slideInUp');
          }, 3000)
        } else {
          this.hanson.classList.remove('slideInUp');
        }
      } catch (e) {
      }

      this.slides.forEach((item) => {
        item.classList.remove('animated', 'slideInDown');
        item.style.display = 'none';
      });

      this.slides[this.slideIndex - 1].style.display = 'block';
      this.slides[this.slideIndex - 1].classList.add('animated', 'slideInDown');
    }
  }

  plusSlide(n) {
    this.showSlides(this.slideIndex += n);
  }

  bindTriggers() {
    this.next.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.plusSlide(1);
      })
    });

    this.prev.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.plusSlide(-1);
      })
    })

    if (this.container) {
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (e) {
      }

      this.btns.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.plusSlide(1);
        });

        item.parentElement.previousElementSibling.addEventListener('click', (e) => {
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        })
      });
    }
  }

  render() {
    this.bindTriggers();
    this.showSlides(this.slideIndex);
  }
}