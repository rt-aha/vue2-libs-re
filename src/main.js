import Vue from 'vue';
import App from './App.vue';
import '@/registerServiceWorker';
import router from './router';
import store from './store';
import VueMeta from 'vue-meta';
import VueI18n from 'vue-i18n';
import i18nData from '@/i18n';

// css
import '@/styles/preset/reset.scss';

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
import '@/styles/sharedStyle.scss';

Vue.mixin({
  methods: {
    toXPage(pushArgs) {
      if (arguments.length === 0 || !pushArgs.name) {
        console.error('至少需路由名稱參數;如為動態路由，需寫動態路由參數');
      }

      // 避免進入相同路由報錯
      if (this.$route.name !== pushArgs.name) {
        this.$router.push(pushArgs);
        return;
      }
    },
    /**
     *
     * @param {object} target 目標實例子
     * @param {string} eventName 事件名稱
     * @param  {...any} params 參數
     */
    dispatchEvent(target, eventName) {
      const args = Array.from(arguments).slice(2);

      // 若沒有相應被註冊的事件，拋錯
      if (!target._events[eventName]) {
        throw new Error('emit對象沒有對應事件');
      }

      target.$emit(eventName, args);
    },
  },
  created() {},
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
