import pages from '@/router/pages';
import dashboard from '@/router/dashboard';

const baseRoute = [
  ...pages,
  ...dashboard,
];

console.log('baseRoute', baseRoute);

/**
 * @params
 *
 * 1. 欲搜尋的path
 * 2. 是否搜尋子path
 * 3. 匹配的RegExp
 */

// 取的目錄下所有檔案
const currFolderFiles = require.context('./', false, /\.js$/);

function getFilesDefaultExport(fileList) {
  const files = [];

  fileList.forEach((path) => {
    files.push(...currFolderFiles(path).default);
  });
  return files;
}

const allRouteFunc = {
  getFilesWithoutIndex() {
    const allFileKeys = currFolderFiles.keys();
    // 將要移除的檔案名稱放到陣列
    const removeFile = ['./index.js', './genMenu.js', './routes.js'];

    return allFileKeys.filter((item) => !removeFile.includes(item));
  },
  getRouteData() {
    const moduleFiles = this.getFilesWithoutIndex();

    return getFilesDefaultExport(moduleFiles);
  },
};

const menuRouteFunc = {
  // 將要渲染在menu名稱檔案寫進來，不用副檔名
  menuOrder: [],
  menuInfoList: [],
  getMenuFiles() {
    return this.menuOrder.map((ele) => `./${ele}.js`);
  },
  getMenuData() {
    const moduleFiles = this.getMenuFiles();

    this.menuInfoList = getFilesDefaultExport(moduleFiles);

    return this;
  },
  takeMatchRouteInfo(name) {
    for (const item of this.menuInfoList) {
      if (item.name === name) {
        return item;
      }
    }

    return '';
  },
  getMenuRouteData() {
    const menuRouteWithOrder = [];
    this.menuOrder.forEach((name) => {
      const matchRouteInfo = this.takeMatchRouteInfo(name);
      menuRouteWithOrder.push(matchRouteInfo);
    });

    this.menuInfoList = []; // 清空陣列，避免無意間重複執行時陣列持續增長
    return menuRouteWithOrder;
  },
};

const routes = allRouteFunc.getRouteData();
const menuRoutes = menuRouteFunc.getMenuData().getMenuRouteData();

console.log('routes ?', routes);

export { menuRoutes, routes, baseRoute };
