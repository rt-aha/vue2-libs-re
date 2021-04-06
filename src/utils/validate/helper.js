const regExpList = {
  YMD: /\d{4}-\d{2}-\d{2}/, // 日期格式必須是 'YYYY-MM-DD'
  phoneNumber: /^09\d{8}$/,
  mamdarin: /[^\u4E00-\u9FA5]/g,
  english: /[a-zA-Z]/g,
  email: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
  passwordLength: /.{6,16}/, // 密碼長度，長度需要時在自訂
  passwordMix: /^(?=.*\d)(?=.*[a-z])/, // 密碼可用字元(數字與大小寫字母)
  passwordLetter: /[A-Z]/, // 至少一個大寫字母
  passwordContent: /^(?=.{6,16})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, // 密碼組合(必須有數字與大小寫字母)
  isEnglishNorNumber: /[^A-Za-z0-9]/, // 不是英文也不是數字
  normalSignAndAlpabat: /^[\u4e00-\u9fa5\w~!@#$%^&*()_+{}|:"<>?[\]\\;',. /]+$/,
};

const validator = {
  ruleList: [],

  vldFunc(value, errMsg, rule, args) {
    // 封裝若干策略

    const strategies = {
      t1() {
        return false;
      },
      t2() {
        return true;
      },

    };

    // console.log('>', strategies[rule]());

    const isPass = strategies[rule].call(this);

    if (!isPass) {
      return this.errMsg(errMsg, rule, args);
    }
  },

  // 自定義錯誤訊息
  customErr(errMsg) {
    const shareExampleErr = {
      tplt() {
        return '這是tplt自訂訊息';
      },
      empty() {
        return '\u00a0'; // 保持一個空白編碼，因為判斷錯誤訊息是否顯示的條件是 空字串/非空字串
      },
    };

    // const warningText = warningValueI18n(errMsg);

    return shareExampleErr[errMsg]();
  },

  // 預設錯誤訊息
  defaultError(rule, args) {
    // const warningText = warningValueI18n(ruleName);

    const defaultErrMsg = {
      t1() {
        return `t1 default error, args:${args}`;
      },
      t2() {
        return 't2 default error';
      },

    };

    return defaultErrMsg[rule]();
  },

  // 回傳錯誤訊息
  errMsg(err, rule, args) {
    let msg = '';

    if (!err) {
      msg = this.defaultError(rule, args);
    } else {
      msg = err;
    }

    return {
      rule,
      msg,
      isPass: false,
    };
  },

  // 將驗證規則加入陣列
  add(value, rules, error, options) {
    rules.forEach((r) => {
      const rule = r.split(':')[0]; // 規則名稱
      const args = r.split(':')[1] || null; // 額外參數
      const errMsg = rule in error ? error[rule] : '';

      // 記錄現在驗證的資訊
      this.ruleList.push(() => this.vldFunc.apply(this, [value, errMsg, rule, args]));
    });
  },

  // 開始驗證
  start() {
    for (const fn of this.ruleList) {
      const msg = fn();

      if (msg) {
        this.ruleList = [];
        return msg;
      }
    }

    return {
      isPass: true,
    };
  },
};

// 可以直接引入用來驗證;
function pureValidator(ruleListAndErrMsg, checkValue, label = '', extraInfo = {}) {
  // console.log(arguments);
  const isArray = Array.isArray(ruleListAndErrMsg);
  const hasValue = typeof checkValue === 'string';

  if (!isArray) {
    throw new Error('驗證規則需為陣列');
  }

  if (!hasValue) {
    throw new Error('缺少驗證值');
  }

  //  {規則, 規則參數, 錯誤提示},值, 標籤, 其他資訊
  const params = {
    ruleListAndErrMsg,
    checkValue,
    label,
    extraInfo,
  };

  validator.add(params);
  const result = validator.start();
  return result;
}

export { validator, pureValidator };
