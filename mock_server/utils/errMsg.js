function errMsg(errCode) {
  const errMsgCollection = {
    1001: '未知錯誤',
  };

  const code = String(errCode);
  const isErrCodeExist = Object.keys(errMsgCollection).includes(code);
  if (!isErrCodeExist) {
    return '代碼無法匹配對應錯誤訊息，可能未撰寫';
  }

  return errMsgCollection[code];
}

export default errMsg;
