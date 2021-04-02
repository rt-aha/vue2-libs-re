import { cloneDeep } from 'lodash';
import routes from '@/router/viewRoutes';
import router from '@/router';

const viewsMapping = routes.reduce((obj, item) => {
  if (item.meta.authCode) {
    obj[item.meta.authCode] = item;
  }

  return obj;
}, {});

// closure 只允許設一次路由
const genMenuOrder = (() => {
  const menuOrder = [];

  return (authList) => {
    if (menuOrder.length !== 0) return menuOrder;
    const parentCodeList = authList.map((ele) => ele.parentCode);
    const parentCode = new Set(parentCodeList);
    const subCodeList = authList.map((ele) => ele.subCode);

    parentCode.forEach((code) => {
      if (code in viewsMapping) {
        const cloneMenu = cloneDeep(viewsMapping[code]);

        const menuChildren = [];

        cloneMenu.children.forEach((route) => {
          // 渲染有權限的路由
          if (subCodeList.includes(route.meta.authCode)) {
            menuChildren.push(route);
          } else if (route.meta.show) {
            menuChildren.push(route);
          }

          // 若不需要權限，直接渲染下面這個
          // menuChildren.push(route);
        });

        cloneMenu.children = menuChildren;
        menuOrder.push(cloneMenu);
      }
    });

    menuOrder.sort((a, b) => {
      if (a.meta.order < b.meta.order) return -1;
      if (a.meta.order > b.meta.order) return 1;
      return 0;
    });

    menuOrder.forEach((route) => {
      router.addRoute(route);
    });

    // console.log('menuOrder', menuOrder);
    return menuOrder;
  };
})();

export default genMenuOrder;
