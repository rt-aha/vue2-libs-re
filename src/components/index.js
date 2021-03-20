/**
 * @params
 *
 * 1. 欲搜尋的path
 * 2. 是否搜尋子path
 * 3. 匹配的RegExp
 */

// 取的目錄下所有檔案
const currFolderFiles = require.context('./', true, /\.vue$/);

// 取得目錄下所有路徑，並過濾不需要的檔案
const getModuleFiles = currFolderFiles.keys().filter((item) => {
  let isRemain = true;
  if (item.indexOf('CheckList') > -1) {
    isRemain = false;
  }

  return isRemain;
});

// 將需要的檔案export default組成物件
const modules = getModuleFiles.map((path) => currFolderFiles(path).default);

export default modules;
