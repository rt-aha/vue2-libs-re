import { routes } from '@/router';
const routerNameInfo = (() => {
  const routerNameInfoMatch = {};

  // || 後面是提示給開發者沒有對應資料
  routes.forEach(firstLayer => {
    if (firstLayer.name && firstLayer.meta.title) {
      routerNameInfoMatch[firstLayer.name] = {
        title: firstLayer.meta.title || 'no-title',
        name: firstLayer.name || 'no-name',
        path: firstLayer.path || 'no-path',
      };
    }

    if (firstLayer.children) {
      firstLayer.children.forEach(secondLayer => {
        if (secondLayer.name && secondLayer.meta.title) {
          routerNameInfoMatch[secondLayer.name] = {
            title: secondLayer.meta.title || 'no-title',
            name: secondLayer.name || 'no-name',
            path: firstLayer.path + '/' + secondLayer.path || 'no-path',
          };
        }
      });
    }
  });

  return routerNameInfoMatch;
})();

export default routerNameInfo;
