import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@indigoichigo/scss';
import components from './components/index';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

components.forEach((comp) => {
  Vue.component(comp.name, comp);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
