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
  data() {
    return {
      addCSS: function() {},
    };
  },
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
  },
  created() {
    // 閉包，避免生成一堆<style></style>造成多餘dom&記憶體溢位
    // menu需要用到動態新增<style></style>中transition所需的動畫
    this.addCSS = (function() {
      const style = document.createElement('style');
      style.setAttribute('data-custom', 'trans');
      const head = document.head || document.getElementsByTagName('head')[0];
      //這裡必須顯示設定style元素的type屬性為text/css，否則在ie中不起作用
      style.type = 'text/css';

      return function(cssText) {
        if (style.styleSheet) {
          //IE
          const func = function() {
            try {
              //防止IE中stylesheet數量超過限制而發生錯誤
              style.styleSheet.cssText = cssText;
            } catch (e) {
              console.log(e);
            }
          };
          //如果當前styleSheet還不能用，則放到非同步中則行
          if (style.styleSheet.disabled) {
            setTimeout(func, 10);
          } else {
            func();
          }
        } else {
          const textNode = document.createTextNode(cssText);
          style.textContent = '';
          style.appendChild(textNode);
        }

        head.appendChild(style); //把建立的style元素插入到head中
      };
    })();
  },
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
