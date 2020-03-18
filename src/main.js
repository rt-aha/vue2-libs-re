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

// element-ui
import ElementUI from 'element-ui';
import '@/styles/preset/reset.scss';
import '@/styles/element-variables.scss';
Vue.use(ElementUI);

Vue.config.productionTip = false;
import '@/styles/sharedStyle.scss';

Vue.mixin({
  methods: {
    toXPage(pushArgs) {
      if (arguments.length === 0 || !pushArgs.name) {
        console.error('至少需路由名稱參數; 如為動態路由，需寫動態路由參數');
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
        // 只是提示，不會發生什麼事
        console.log('emit對象沒有對應事件');
        return;
      }

      target.$emit(eventName, args);
    },
    validateForm(form) {
      const formKey = Object.keys(form);

      // 觸發事件，呼叫子組件驗證function
      // 兩個迴圈不能寫再一起是因為，要全部都驗證並提示錯誤訊息，不能只有單一個
      for (const key of formKey) {
        this.$refs[key].$emit('handleValidate');
      }

      // 檢查子組件驗證完成後的結果，有任一false，就是未通過
      for (const key of formKey) {
        const validateResult = this.$refs[key].$parent.isPassValidate;

        if (!validateResult) {
          return false;
        }
      }

      return true;
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
