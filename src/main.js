import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueMeta from 'vue-meta';
import VueI18n from 'vue-i18n';
import i18nData from '@/i18n';
import mixin from '@/mixin';

// mixin
Vue.mixin(mixin);

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

// element-ui
import ElementUI from 'element-ui';
import '@/styles/element-variables.scss';
Vue.use(ElementUI);

Vue.config.productionTip = false;
import '@/styles/sharedStyle.scss';

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
