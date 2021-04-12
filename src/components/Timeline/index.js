import ReTimeline from './src/Timeline.vue';

/* istanbul ignore next */
ReTimeline.install = (Vue) => {
  Vue.component(ReTimeline.name, ReTimeline);
};

export default ReTimeline;
