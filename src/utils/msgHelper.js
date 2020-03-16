import Vue from 'vue';
import { Message } from 'element-ui';

Vue.component(Message.name, Message);

// 狀態400時
function badResHelper(e) {
  const errMsg = e.response.data.message || '未知錯誤';

  Vue.prototype.$message({
    type: 'error',
    message: errMsg,
    duration: 2000,
  });

  // token如果過期，返回登入畫面
  if (errMsg === '驗證無效') {
    localStorage.clear();
    location.href = `//${location.host}`;
  }
  throw new Error(e);
}

// 其他訊息
function customMsgHelper(type = 'success', msg) {
  Vue.prototype.$message({
    type,
    message: msg,
    duration: 2000,
  });
}

export { badResHelper, customMsgHelper };
