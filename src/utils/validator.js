// 引入i18n中的所有 validator.ts
// import VueI18n from 'vue-i18n';
// import { validatorMsg } from '@/i18n';
// import Vue from 'vue';

// Vue.use(VueI18n);

// let lang = location.pathname.split('/')[1];

// const availableLangList[] = ['zh-tw', 'zh-cn', 'en', 'id', 'my', 'th', 'vn'];
// // 若lang取出失敗，預設zh-cn
// if (!availableLangList.includes(lang)) {
//   lang = 'zh-cn';
// }

// // Create VueI18n instance with options
// const i18n = new VueI18n({
//   locale: lang, // set locale
//   messages: {
//     [lang]: validatorMsg[lang],
//   },
// });

// 取得i18n翻譯
// function warningValueI18n(key) {
//   const firstLetter = key.slice(0, 1).toUpperCase();
//   const splitKeys = key.split('');
//   splitKeys.splice(0, 1, firstLetter);
//   const warningText = splitKeys.join('');

//   const errMsgObj: { [key] } | string = {};

//   // 表示沒有語言要翻譯
//   const hasKey: boolean = warningText in validatorMsg[lang].validator;
//   if (!hasKey) {
//     return '';
//   }

//   // 如果i18n的值是字串直接返回
//   if (typeof validatorMsg[lang].validator[warningText] === 'string') {
//     return i18n.tc(`validator.${warningText}`);
//   }

//   // 如果i18n的值是物件
//   for (const key in validatorMsg[lang].validator[warningText]) {
//     if (key) {
//       errMsgObj[key] = i18n.tc(`validator.${warningText}.${key}`);
//     }
//   }

//   return errMsgObj;
// }

const regExpList = {
  YMD: /\d{4}-\d{2}-\d{2}/, // 日期格式必須是 'YYYY-MM-DD'
  phoneNumber: /^09\d{8}$/,
  mamdarin: /[^\u4E00-\u9FA5]/g,
  english: /[a-zA-Z]/g,
  emailFormat: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
  passwordLength: /.{6,16}/, // 密碼長度
  passwordMix: /^(?=.*\d)(?=.*[a-z])/, // 密碼可用字元(數字與大小寫字母)
  passwordLetter: /[A-Z]/, // 至少一個大寫字母
  passwordContent: /^(?=.{6,16})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, // 密碼組合(必須有數字與大小寫字母)
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
      if (checkValue === null || checkValue === -1 || checkValue === '') {
        return this.errMsg(rule, label);
      }
    },
    // 滿足輸入框有內容
    hasText(rule, checkValue, label) {
      console.log('...', checkValue.trim() === '');
      if (checkValue.trim() === '') {
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
    // 滿足email格式
    emailFormat(rule, checkValue, label) {
      const isPass = regExpList.english.test(checkValue);
      if (!isPass) {
        return this.errMsg(rule, label);
      }
    },
    // 滿足特定年，預設6年
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
        return `請選擇`;
      },
      isSelect() {
        return `請選擇`;
      },
      hasText() {
        return `請輸入`;
      },
      lessStringLenth() {
        return `長度不可超過${extraInfo}位數`;
      },
      overStringLength() {
        return `長度需至少${extraInfo}位數`;
      },
      phoneFormat() {
        return `格式錯誤`;
      },
      isMamdarin() {
        return `僅可輸入中文`;
      },
      isEnglish() {
        return `僅可輸入英文`;
      },
      emailFormat() {
        return `僅可使用E-mail`;
      },
      isOverSomeYear() {
        return `需滿${extraInfo}年`;
      },
    };

    return defaultErrMsg[ruleName]();
  },

  // 回傳錯誤訊息
  errMsg(rule, label, extraInfo) {
    let errMsg = '';

    console.log(rule, label, extraInfo);

    if (rule.errMsg === undefined) {
      errMsg = this.defaultErr(rule.name, label, extraInfo);
    } else {
      errMsg = this.customErr(rule.errMsg);
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
      console.log('hi');
      const ruleAndErrMsg = item.split('-'); // 分離規則和錯誤訊息
      const ruleList = ruleAndErrMsg[0]; // 規則名稱(與參數)
      const ruleName = ruleList.split(':').shift(); // 將規則名稱取出
      const ruleArgs = ruleList.split(':').slice(1) || []; // 去除規則，是一個陣列
      const errMsg = ruleAndErrMsg[1] || undefined; // 有自訂錯誤訊息才有值
      const rule = {
        name: ruleName,
        args: ruleArgs,
        errMsg,
      };

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
      ruleName: '',
      inputName: '',
      errInfo: '',
      isPass: true,
    };
  },
};

// 可以直接引入用來驗證;
function pureValidator(innerValue, otherValue, labelName, ruleList) {
  const params = {
    value: {
      value: innerValue,
      otherValue: otherValue || '',
    },
    inputName: labelName,
    ruleList,
  };

  validator.add(params);
  const result = validator.start();

  return result;
}

export { validator, pureValidator };
