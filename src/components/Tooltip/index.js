import ReTooltip from './src/Tooltip.vue';

/* istanbul ignore next */
ReTooltip.install = (Vue) => {
  Vue.component(ReTooltip.name, ReTooltip);
};

export default ReTooltip;
