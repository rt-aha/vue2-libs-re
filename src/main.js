import Vue from 'vue';
import ReButton from '@/components/Button';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@indigoichigo/scss';
import components from './components/index';

Vue.config.productionTip = false;

components.forEach((comp) => {
  Vue.component(comp.name, comp);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
