import Vue from 'vue';

const routeObservable = Vue.observable({ menuList: [] });
const routeMutation = {
  setMenuList(menu) {
    routeObservable.menuList = menu;
  },
};

export { routeObservable, routeMutation };
