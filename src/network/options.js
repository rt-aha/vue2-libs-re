// 自定義請求時其他資訊的預設值
// 避免多個service有須改變options設定時存取相同記憶體位置，所以用建構函式吐回純物件
function Options() {
  return {
    usedHeaderConfigName: 'defaultConfig',
    showLoading: false, // 是否顯示全域loading
    showErrMsg: true, // 是否顯示全域錯誤訊息
  };
}

export default Options;
