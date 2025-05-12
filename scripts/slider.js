import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const clientWidth = document.documentElement.clientWidth;
let spaceBetween = 40, // 20-40
    dragSize = 140; // 140-260

// resolution between 320px and 1279px
if (clientWidth - 320 < 960) {
  spaceBetween = (clientWidth - 320) / 960 * 20 + 20;
}

if (clientWidth - 480 < 480) { // resolution between  480px and 959px
  dragSize = (clientWidth - 480) / 480 * 120 + 140;
} else if (clientWidth - 960 < 320) { // resolution between  960px and 1279px
  dragSize = (clientWidth - 960) / 320 * 50 + 210;
} else if (clientWidth >= 1280) {
  dragSize = 260;
}


new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
    draggable: true,
    dragSize
  },
  breakpoints: {
    480: { slidesPerView: 2 },
    960: { slidesPerView: 3 }
  }
});