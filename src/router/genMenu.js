import { cloneDeep } from 'lodash';
import { routes } from '@/router/routes';
import router from '@/router';

console.log('123', routes);

const viewsMapping = routes.reduce((obj, item) => {
  if (item.meta.authCode) {
    obj[item.meta.authCode] = [item];
  }

  return obj;
}, {});

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
        cloneMenu[0].children.forEach((route) => {
          if (subCodeList.includes(route.meta.authCode)) {
            menuChildren.push(route);
          } else if (route.meta.show) {
            menuChildren.push(route);
          }
        });
        cloneMenu[0].children = menuChildren;
        menuOrder.push(...cloneMenu);
      }
    });

    menuOrder.sort((a, b) => {
      if (a.meta.order < b.meta.order) return -1;
      if (a.meta.order > b.meta.order) return 1;
      return 0;
    });

    // 這裡動態添加有權限的路由
    router.addRoutes(menuOrder);
    return menuOrder;
  };
})();
// }, 10);
// clearInterval(timer);

// 若不需要權限，直接渲染下面這個
// const menuOrder = {
//   ...account,
//   ...setting,
// };

console.log('genMenuOrder', genMenuOrder);
export default genMenuOrder;
