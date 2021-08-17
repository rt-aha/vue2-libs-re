import testAuthList from '@/utils/testAuthList';
import genMenu from '@/router/genMenu';
import { routeObservable, routeMutation } from '@/observable/route';
import router from '@/router';
import { getPermissionAPI } from '@/api/test';

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
    async writeDynamicRoutes() {
      if (this.isWriteDynamicRoutes) return;

      routeMutation.setisWriteDynamicRoutes();

      const token = true;
      if (token) {
        try {
          console.log(1);
          const authList = await getPermissionAPI();
          console.log(2);
          const menuList = genMenu(authList);
          console.log(3, menuList);
          this.setMenuList(menuList);
        } catch (e) {
          console.log('e...', e);
        }
      }

      // 404 page 必須在routes最後面
      router.addRoute(page404route);
    },
    // },
  },
};
