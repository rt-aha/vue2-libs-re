import { routes } from '@/router';
const routerNameInfo = (() => {
  const routerNameInfoMatch = {};
  routes.forEach(firstLayer => {
    if (firstLayer.name && firstLayer.meta.title) {
      routerNameInfoMatch[firstLayer.name] = {
        title: firstLayer.meta.title,
        name: firstLayer.name,
        path: firstLayer.path,
      };
    }

    if (firstLayer.children) {
      firstLayer.children.forEach(secondLayer => {
        if (secondLayer.name && secondLayer.meta.title) {
          routerNameInfoMatch[secondLayer.name] = {
            title: secondLayer.meta.title,
            name: secondLayer.name,
            path: firstLayer.path + '/' + secondLayer.path,
          };
        }
      });
    }
  });

  return routerNameInfoMatch;
})();

export default routerNameInfo;
