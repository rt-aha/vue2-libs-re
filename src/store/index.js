import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
const getModuleFiles = currFolderFiles.keys().filter((item) => {
  // 不需要的檔案寫進來
  const excludeFiles = ['./index.js', './types.js'];
  let isRemain = true;

  if (excludeFiles.indexOf(item) > -1) {
    isRemain = false;
  }

  return isRemain;
});

// 將需要的檔案export default組成物件
let modules = {};
getModuleFiles.forEach((path) => {
  const moduleName = path.replace(/((.\/)|(.js))/g, '');
  modules = { ...modules, [moduleName]: currFolderFiles(path).default };
});

const store = new Vuex.Store({
  modules,
});

export default store;
