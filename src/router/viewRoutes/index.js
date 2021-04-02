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
    const removeFile = ['./index.js'];

    return allFileKeys.filter((item) => !removeFile.includes(item));
  },
  getRouteData() {
    const moduleFiles = this.getFilesWithoutIndex();

    return getFilesDefaultExport(moduleFiles);
  },
};

const viewRoutes = allRouteFunc.getRouteData();

export default viewRoutes;
