import ReSwitch from './src/Switch.vue';

/* istanbul ignore next */
ReSwitch.install = (Vue) => {
  Vue.component(ReSwitch.name, ReSwitch);
};

export default ReSwitch;
