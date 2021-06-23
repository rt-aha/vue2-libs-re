import Vue from 'vue';
// import ElementUI from 'element-ui';
import writeDynamicRoutes from '@/mixins/writeDynamicRoutes';
import ReMessage from './components/Message/src/message';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@indigoichigo/scss';
import '@/styles/components/loading.scss';
import components from './components/index';

// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.mixin(writeDynamicRoutes);
Vue.prototype.Message = ReMessage;

Vue.directive('loading', {
  bind(el, binding, vnode) {
    console.log('binding.value', binding);
    if (binding.value) {
      el.classList.add('re-loading');
    } else {
      el.classList.remove('re-loading');
    }
  },
  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      if (binding.value) {
        el.classList.add('re-loading');
      } else {
        el.classList.remove('re-loading');
      }
    }
  },
});

components.forEach((comp) => {
  Vue.component(comp.name, comp);
  // if (comp.name !== 'Menu' && comp.name !== 'ReBreadcrumb') {
  // }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
