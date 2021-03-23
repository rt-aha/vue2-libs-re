import ReTabPane from './src/TabPane.vue';

/* istanbul ignore next */
ReTabPane.install = (Vue) => {
  Vue.component(ReTabPane.name, ReTabPane);
};

export default ReTabPane;
