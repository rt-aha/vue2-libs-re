import ReTestComp from './src/TestComp.vue';

/* istanbul ignore next */
ReTestComp.install = (Vue) => {
  Vue.component(ReTestComp.name, ReTestComp);
};

export default ReTestComp;
