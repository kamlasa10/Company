export default class PlayVideo {
  constructor(trigger, overlay) {
    this.trigger = document.querySelectorAll(trigger);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
    this.frame = document.querySelector('#frame');
    this.player = null;
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  bindBtns() {
    this.trigger.forEach((item, i) => {
      if(i % 2 === 1) {
        item.setAttribute('data-disabled', 'true');
      }

      item.addEventListener('click', (e) => {
        e.preventDefault();
        if(!item.getAttribute('data-disabled') || item.getAttribute('data-disabled') !== 'true') {
          this.active = item;
          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex';
            if(this.path !== item.getAttribute('data-url')) {
              this.path = item.getAttribute('data-url');
              try {this.player.loadVideoById({videoId: this.path});} catch (e) {}}
          } else {
            this.overlay.style.display = 'flex';
            this.path = item.getAttribute('data-url');
            this.createVideoPlayer(this.path);
          }
        }
      })
    })
  };

  bindClose() {
    this.close.addEventListener('click', (e) => {
      e.preventDefault();
      this.overlay.style.display = 'none';
      this.player.pauseVideo();
    })
  }

  onPlayerStateChange(state) {
    if(state.data === 0) {
      const blockedElem = this.active.closest('.module__video-item').nextElementSibling;
      const play = this.active.querySelector('svg').cloneNode(true);

      blockedElem.style.opacity = 1;
      blockedElem.style.filter = 'none';
      blockedElem.querySelector('.play__text').textContent = 'Play Video';
      blockedElem.querySelector('.play__text').classList.remove('attention');
      blockedElem.querySelector('.play__circle').classList.remove('closed');
      blockedElem.querySelector('svg').remove();
      blockedElem.querySelector('.play__circle').appendChild(play);
      blockedElem.querySelector('.play').setAttribute('data-disabled', 'false');
    }
  }

  createVideoPlayer(url) {
    this.player = new YT.Player(this.frame, {
      height: '100%',
      width: '100%',
      videoId: url,
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
  }

  init() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindBtns();
    this.bindClose();
  }
}