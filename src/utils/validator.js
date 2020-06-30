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

  // 封裝若干策略
  formValidateStrategies: {
    // 滿足日期格式必須是 'YYYY-MM-DD'
    legal4Y4M2D(rule, checkValue, label) {
      const isPass = regExpList.YMD.test(checkValue);
      if (!isPass) {
        return this.errMsg(rule, label);
      }
    },
    // 滿足必須被選取
    isSelect(rule, checkValue, label) {
      console.log('isSelect', checkValue === null || checkValue === -1 || checkValue === '', checkValue);
      if (checkValue === null || checkValue === -1 || checkValue === '') {
        return this.errMsg(rule, label);
      }
    },
    // 滿足輸入框有內容
    hasText(rule, checkValue, label) {
      console.log('checkValue', checkValue);
      if (checkValue === '') {
        return this.errMsg(rule, label);
      }
    },
    // 滿足少於多少字
    lessStringLenth(rule, checkValue, label) {
      const atLeastLength = rule.args[0];
      if (checkValue.trim().length > atLeastLength) {
        return this.errMsg(rule, label, rule.args[0]);
      }
    },
    // 滿足多於多少字
    overStringLength(rule, checkValue, label) {
      const limitedLength = rule.args[0];
      if (checkValue.trim().length < limitedLength) {
        return this.errMsg(rule, label, limitedLength);
      }
    },
    // 滿足多於多少字且滿足少於多少字
    // e.g. 'limitStringLength:5~20'
    limitStringLength(rule, checkValue, label) {
      const stringLimited = rule.args[0].split('~');
      const lowLimit = +stringLimited[0];
      const highLimit = +stringLimited[1];

      if (checkValue.length < 5 || checkValue.length > 20) {
        return this.errMsg(rule, label, { lowLimit, highLimit });
      }
    },
    // 滿足電話格式
    phoneFormat(rule, checkValue, label) {
      const isPass = regExpList.phoneNumber.test(checkValue);
      if (!isPass) {
        return this.errMsg(rule, label);
      }
    },
    // 滿足內容為中文
    isMamdarin(rule, checkValue, label) {
      const isPass = regExpList.mamdarin.test(checkValue);
      if (!isPass) {
        return this.errMsg(rule, label);
      }
    },
    // 滿足內容為英文
    isEnglish(rule, checkValue, label) {
      const isPass = regExpList.english.test(checkValue);
      if (!isPass) {
        return this.errMsg(rule, label);
      }
    },
    // 必須是英文或數字
    isMamdarinOrEnglish(rule, checkValue, label) {
      const isPass = regExpList.isEnglishNorNumber.test(checkValue);
      if (isPass) {
        return this.errMsg(rule, label);
      }
    },
    // 滿足正常字母與標點符號
    isNormalSignAndAlpabat(rule, checkValue, label) {
      const isPass = regExpList.normalSignAndAlpabat.test(checkValue);
      if (!isPass) {
        return this.errMsg(rule, label);
      }
    },
    // 滿足email格式
    emailFormat(rule, checkValue, label) {
      const isPass = regExpList.email.test(checkValue);
      if (!isPass) {
        return this.errMsg(rule, label);
      }
    },
    // 滿足特定年
    isOverSomeYear(rule, checkValue, label) {
      const yearLength = Number(rule.args[0]);
      const compareDayArr = checkValue.split('-');
      const compareDayYMD = {
        y: Number(compareDayArr[0]),
        m: Number(compareDayArr[1]),
        d: Number(compareDayArr[2]),
      };

      const today = new Date();
      const todayYMD = {
        y: today.getFullYear(),
        m: today.getMonth() + 1,
        d: today.getDate(),
      };

      if (todayYMD.y - compareDayYMD.y < yearLength) {
        return this.errMsg(rule, label, rule.args[0]);
      }

      if (todayYMD.y - compareDayYMD.y === yearLength) {
        if (todayYMD.m - compareDayYMD.m < 0 || todayYMD.d - compareDayYMD.d < 0) {
          return this.errMsg(rule, label, rule.args[0]);
        }
      }
    },

    notNegativeNum(rule, checkValue, label) {
      const valueInt = +checkValue;
      if (isNaN(valueInt) || typeof valueInt !== 'number') {
        return this.errMsg(rule, label, rule.args[0]);
      }

      if (valueInt < 0) {
        return this.errMsg(rule, label, rule.args[0]);
      }
    },
    comfirmPwd(rule, checkValue, label, extraInfo) {
      if (checkValue.trim() !== extraInfo.confirmPwd.trim()) {
        return this.errMsg(rule, label);
      }
    },
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
  defaultErr(ruleName, label, extraInfo = '') {
    // const warningText = warningValueI18n(ruleName);

    const defaultErrMsg = {
      legal4Y4M2D() {
        return `请选择`;
      },
      isSelect() {
        return `请选择`;
      },
      hasText() {
        return `请输入${label}`;
      },
      lessStringLenth() {
        return `长度不可超过${extraInfo}位数`;
      },
      overStringLength() {
        return `长度需至少${extraInfo}位数`;
      },
      phoneFormat() {
        return `格式错误`;
      },
      isMamdarin() {
        return `仅可输入中文`;
      },
      isEnglish() {
        return `仅可输入英文`;
      },
      isMamdarinOrEnglish() {
        return `請輸入英文或數字`;
      },
      emailFormat() {
        return `请填写正确的Email格式`;
      },
      isOverSomeYear() {
        return `需满${extraInfo}年`;
      },
      comfirmPwd() {
        return `确认密码错误`;
      },
      isNormalSignAndAlpabat() {
        return '請輸入英数及常见特殊符号';
      },
      limitStringLength() {
        return `請輸入${extraInfo.lowLimit}~${extraInfo.highLimit}字的英文或數字`;
      },
    };

    return defaultErrMsg[ruleName]();
  },

  // 回傳錯誤訊息
  errMsg(rule, label, extraInfo) {
    let errMsg = '';

    // 若為
    if (rule.customMsg === undefined) {
      errMsg = this.defaultErr(rule.name, label, extraInfo);
    } else {
      errMsg = this.customErr(rule.customMsg);
    }

    return {
      ruleName: rule.name,
      label,
      errInfo: errMsg,
      isPass: false,
    };
  },

  // 將驗證規則加入陣列
  add(params) {
    // 第三個參數有多少個規則，就跑幾次迴圈

    const { ruleListAndErrMsg, checkValue, label, extraInfo } = params;

    ruleListAndErrMsg.forEach(item => {
      const ruleAndErrMsg = item.split('-'); // 分離規則和錯誤訊息
      const ruleList = ruleAndErrMsg[0]; // 規則名稱(與參數)
      const ruleName = ruleList.split(':').shift(); // 將規則名稱取出
      const ruleArgs = ruleList.split(':').slice(1) || []; // 去除規則，是一個陣列
      const customMsg = ruleAndErrMsg[1] || undefined; // 有自訂錯誤訊息才有值
      const rule = {
        name: ruleName,
        args: ruleArgs,
        customMsg,
      };

      // 記錄現在驗證的資訊

      this.ruleList.push(() => {
        return this.formValidateStrategies[ruleName].call(this, rule, checkValue, label, extraInfo);
      });
    });
  },

  // 開始驗證
  start() {
    for (const item of this.ruleList) {
      const msg = item();

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
  console.log(arguments);
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
