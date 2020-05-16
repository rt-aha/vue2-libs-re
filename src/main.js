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
    /**
     * trigger其他事件
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
    /**
     * 驗證
     *
     * @param {object} form 要驗證的refs
     */
    validateForm(form) {
      // 條件複雜時在操作中可能會產生undfeind物件，清除掉
      for (const obj in form) {
        if (form[obj] === undefined) {
          delete form[obj];
        }
      }
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
    /**
     * 將要驗證的陣列轉為物件
     *
     * @param {array} refList 要驗證組建的ref陣列
     */
    explicitRefList(refList) {
      const validatorObj = {};

      for (const item of refList) {
        validatorObj[item] = this.$refs[item];
      }

      return validatorObj;
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
