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
    isWriteDynamicRoutes() {
      return routeObservable.isWriteDynamicRoutes;
    },
  },
  methods: {
    setMenuList: routeMutation.setMenuList,
    writeDynamicRoutes() {
      if (this.isWriteDynamicRoutes) return;

      routeMutation.setisWriteDynamicRoutes();

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
