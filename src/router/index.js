import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * @params
 *
 * 1. 欲搜尋的path
 * 2. 是否搜尋子path
 * 3. 匹配的RegExp
 */

// 取的目錄下所有檔案
const currFolderFiles = require.context('./', false, /\.js$/);

// 取得目錄下所有檔案名稱，並過濾不需要的檔案
const getModuleFiles = currFolderFiles.keys().filter(item => {
  // 不需要的檔案寫進來
  const removeFile = ['./index.js'];
  let isRemain = true;

  if (removeFile.indexOf(item) > -1) {
    isRemain = false;
  }

  return isRemain;
});

const routes = [];
getModuleFiles.forEach(path => {
  routes.push(...currFolderFiles(path).default);
});

// 取得menu路由
const getMenuFiles = currFolderFiles.keys().filter(item => {
  // 將要渲染在menu的檔案寫進來
  const remainList = ['./tplt1.js', './tplt2.js'];
  return remainList.indexOf(item) > -1;
});

let menuRoute = [];
getMenuFiles.forEach(path => {
  menuRoute.push(...currFolderFiles(path).default);
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export { menuRoute, routes };
export default router;
