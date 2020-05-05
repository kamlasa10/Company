import PlayVideo from "./modules/playVideo";
import MainSlider from "./modules/slider/mainSlider";
import SliderMini from "./modules/slider/slider-mini";
import Difference from "./modules/difference";
import Forms from "./modules/forms";
import Accordion from "./modules/accordion";
import Download from "./modules/download";

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({container: '.page', btns: '.next'});
  slider.render();

  const moduleSlider = new MainSlider({container: '.moduleapp', btns: '.next'}, '.nextmodule', '.prevmodule');
  moduleSlider.render();

  new Accordion('.module__info-show .plus').init();

  new Download('.download .download__text').init();

  const playVideo = new PlayVideo('.play', '.overlay');
  playVideo.init();
  new PlayVideo('.module__video-item .play', '.overlay').init();

  const slideMini = new SliderMini({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    active: 'card-active',
    animated: true
  });
  slideMini.init();

  const slideMiniModules = new SliderMini({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    active: 'card-active',
    animated: true,
    autoPlay: true
  });
  slideMiniModules.init();

  const slideMiniFeed = new SliderMini({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    active: 'feed__item-active',
  });
  slideMiniFeed.init();

  new Difference('.officerold', '.officernew', '.officer__card-item').init();

  const forms = new Forms('form');
  forms.init();
});