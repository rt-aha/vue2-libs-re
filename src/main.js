import Vue from 'vue';
// import ElementUI from 'element-ui';
import writeMenuList from '@/mixins/writeMenuList';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@indigoichigo/scss';
import components from './components/index';

// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.mixin(writeMenuList);

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
