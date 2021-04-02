import Vue from 'vue';

const routeObservable = Vue.observable({ menuList: [], isWrite404page: false });
const routeMutation = {
  setMenuList(menu) {
    routeObservable.menuList = menu;
  },
  setIsWrite404page() {
    routeObservable.isWrite404page = true;
  },
};

export { routeObservable, routeMutation };
