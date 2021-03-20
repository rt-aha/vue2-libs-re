import ReBreadcrumb from './src/Breadcrumb.vue';

/* istanbul ignore next */
ReBreadcrumb.install = (Vue) => {
  Vue.component(ReBreadcrumb.name, ReBreadcrumb);
};

export default ReBreadcrumb;
