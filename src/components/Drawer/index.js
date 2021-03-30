import ReDrawer from './src/Drawer.vue';

/* istanbul ignore next */
ReDrawer.install = (Vue) => {
  Vue.component(ReDrawer.name, ReDrawer);
};

export default ReDrawer;
