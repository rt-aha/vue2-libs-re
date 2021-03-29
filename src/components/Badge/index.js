import ReBadge from './src/Badge.vue';

/* istanbul ignore next */
ReBadge.install = (Vue) => {
  Vue.component(ReBadge.name, ReBadge);
};

export default ReBadge;
