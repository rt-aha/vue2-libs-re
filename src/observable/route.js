import Vue from 'vue';

const routeObservable = Vue.observable({ menuList: [], isWriteDynamicRoutes: false });
const routeMutation = {
  setMenuList(menu) {
    routeObservable.menuList = menu;
  },
  setisWriteDynamicRoutes() {
    routeObservable.isWriteDynamicRoutes = true;
  },
};

export { routeObservable, routeMutation };
