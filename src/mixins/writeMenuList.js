import testAuthList from '@/utils/testAuthList';
import genMenu from '@/router/genMenu';
import { routeObservable, routeMutation } from '@/observable/route';
import router from '@/router';

const page404route = {
  path: '*',
  name: 'page404',
  component: () => import(/* webpackChunkName: "Page404" */ '@/views/Page404.vue'),
  meta: {
    title: '404',
  },
};

export default {
  computed: {
    isWrite404page() {
      return routeObservable.isWrite404page;
    },
  },
  methods: {
    setMenuList: routeMutation.setMenuList,
    writeMenuList() {
      if (this.isWrite404page) return;

      routeMutation.setIsWrite404page();

      const token = true;
      if (token) {
        // testAuthList 由api取得
        const menuList = genMenu(testAuthList);
        this.setMenuList(menuList);
      }

      // 404 page 必須在routes最後面
      router.addRoute(page404route);
    },
    // },
  },
};
