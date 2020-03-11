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
    addCSS(cssText) {
      console.log('dynamic css');
      const style = document.createElement('style'); //建立一個style元素
      style.setAttribute('data-custom', 'trans');
      const head = document.head || document.getElementsByTagName('head')[0]; //獲取head元素
      style.type = 'text/css'; //這裡必須顯示設定style元素的type屬性為text/css，否則在ie中不起作用
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
        style.appendChild(textNode);
      }
      head.appendChild(style); //把建立的style元素插入到head中
    },
  },
});

// function addCSS(cssText) {
//   const style = document.createElement('style'); //建立一個style元素
//   style.setAttribute('data-custom', 'trans');
//   const head = document.head || document.getElementsByTagName('head')[0]; //獲取head元素
//   style.type = 'text/css'; //這裡必須顯示設定style元素的type屬性為text/css，否則在ie中不起作用
//   if (style.styleSheet) {
//     //IE
//     const func = function() {
//       try {
//         //防止IE中stylesheet數量超過限制而發生錯誤
//         style.styleSheet.cssText = cssText;
//       } catch (e) {
//         console.log(e);
//       }
//     };
//     //如果當前styleSheet還不能用，則放到非同步中則行
//     if (style.styleSheet.disabled) {
//       setTimeout(func, 10);
//     } else {
//       func();
//     }
//   } else {
//     const textNode = document.createTextNode(cssText);
//     style.appendChild(textNode);
//   }
//   head.appendChild(style); //把建立的style元素插入到head中
// }
//使用
// addCSS('.demo{ width: 30px; height: 30px; background:#f00;}');

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
