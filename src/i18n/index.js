/**
 * @params
 *
 * 1. 欲搜尋的path
 * 2. 是否搜尋子path
 * 3. 匹配的RegExp
 */

// 取的目錄下所有檔案
const currFolderFiles = require.context('./', true, /\.js$/);

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

let i18nObj = {};

getModuleFiles.forEach(item => {
  const [lang, file] = item.replace(/\.\/|\.js/g, '').split('/'); // 清除路徑中多餘的字
  i18nObj[lang] = { ...i18nObj[lang] }; // 新增語言物件
  i18nObj[lang][file] = currFolderFiles(item).default;
});

export default i18nObj;
