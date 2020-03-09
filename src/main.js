import Vue from 'vue';
import App from './App.vue';
import '@/registerServiceWorker';
import router from './router';
import store from './store';
import VueMeta from 'vue-meta';
import VueI18n from 'vue-i18n';
import i18nData from '@/i18n';

// vue-meta
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

// i18n
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  messages: i18nData,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
