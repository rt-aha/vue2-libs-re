import ReCarousel from './src/Carousel.vue';

/* istanbul ignore next */
ReCarousel.install = (Vue) => {
  Vue.component(ReCarousel.name, ReCarousel);
};

export default ReCarousel;
