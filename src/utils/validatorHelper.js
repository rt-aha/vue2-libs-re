import dayjs from 'dayjs';
import { IvalidateParams, IvalidateResult } from '@/interface/validateTyping';

// 引入i18n中的所有 validator.ts
import VueI18n from 'vue-i18n';
import { validatorMsg } from '@/i18n';
import Vue from 'vue';
import cookie from 'cookiejs';
Vue.use(VueI18n);

let lang = location.pathname.split('/')[1];

const availableLangList = ['zh-tw', 'zh-cn', 'en', 'id', 'my', 'th', 'vn'];
// 若lang取出失敗，預設zh-cn
if (!availableLangList.includes(lang)) {
  lang = 'zh-cn';
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang, // set locale
  messages: {
    [lang]: validatorMsg[lang],
  },
});

// 暫時沒有function用到
// const validationRegex = {
//   Email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
//   PasswordLength: /.{6,16}/, // 密碼長度
//   PasswordMix: /^(?=.*\d)(?=.*[a-z])/, // 密碼可用字元(數字與大小寫字母)
//   PasswordLetter: /[A-Z]/, // 至少一個大寫字母
//   PasswordContent: /^(?=.{6,16})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, // 密碼組合(必須有數字與大小寫字母)
// };

// 取得i18n翻譯
function warningValueI18n(key) {
  const firstLetter = key.slice(0, 1).toUpperCase();
  const splitKeys = key.split('');
  splitKeys.splice(0, 1, firstLetter);
  const warningText = splitKeys.join('');

  const errMsgObj = {};

  // 表示沒有語言要翻譯
  const hasKey = warningText in validatorMsg[lang].validator;
  if (!hasKey) {
    return '';
  }

  // 如果i18n的值是字串直接返回
  if (typeof validatorMsg[lang].validator[warningText] === 'string') {
    return i18n.tc(`validator.${warningText}`);
  }

  // 如果i18n的值是物件
  for (const key in validatorMsg[lang].validator[warningText]) {
    if (key) {
      errMsgObj[key] = i18n.tc(`validator.${warningText}.${key}`);
    }
  }

  return errMsgObj;
}

class Validator {
  ruleList = [];

  // 封裝若干策略
  formValidateStrategies = {
    // 滿足日期格式必須是 'YYYY-MM-DD'
    legal4Y4M2D(ruleName, value, inputName) {
      const isPass = regExpList.YMD.test(value);
      if (!isPass) {
        return this.errMsg(ruleName, inputName);
      }
    },
    // 滿足必須被選取
    isSelect(ruleName, value, inputName) {
      if (value === null || value === -1 || value === '') {
        return this.errMsg(ruleName, inputName);
      }
    },
    // 滿足輸入框有內容
    hasText(ruleName, value, inputName) {
      if (value.trim() === '') {
        return this.errMsg(ruleName, inputName);
      }
    },
    // 滿足少於多少字
    lessStringLenth(ruleName, length = 6, value, inputName) {
      if (value.trim().length > length) {
        return this.errMsg(ruleName, inputName, length);
      }
    },
    // 滿足多於多少字
    overStringLength(ruleName, length = 6, value, inputName) {
      if (value.trim().length < length) {
        return this.errMsg(ruleName, inputName, length);
      }
    },
    // 滿足電話格式
    phoneFormat(ruleName, value, inputName) {
      const isPass = regExpList.phoneNumber.test(value);
      if (!isPass) {
        return this.errMsg(ruleName, inputName);
      }
    },
    // 滿足內容為中文
    isMamdarin(ruleName, value, inputName) {
      const isPass = regExpList.mamdarin.test(value);
      if (!isPass) {
        return this.errMsg(ruleName, inputName);
      }
    },
    // 滿足內容為英文
    isEnglish(ruleName, value, inputName) {
      const isPass = regExpList.english.test(value);
      if (!isPass) {
        return this.errMsg(ruleName, inputName);
      }
    },
    // 滿足email格式
    emailFormat(ruleName, value, inputName) {
      const isPass = regExpList.english.test(value);
      if (!isPass) {
        return this.errMsg(ruleName, inputName);
      }
    },
    // 滿足特定年，預設6年
    isOverSomeYear(ruleName, yearLength = 6, value, inputName) {
      yearLength = Number(yearLength);
      const compareDayArr = value.split('-');
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
        return this.errMsg(ruleName, inputName, yearLength);
      }

      if (todayYMD.y - compareDayYMD.y === yearLength) {
        if (todayYMD.m - compareDayYMD.m < 0 || todayYMD.d - compareDayYMD.d < 0) {
          return this.errMsg(ruleName, inputName, yearLength);
        }
      }
    },
  };

  // 自定義錯誤訊息
  customErr(errMsg) {
    const shareExampleErr = {
      example(msg) {
        return msg;
      },
      empty() {
        return '\u00a0'; // 保持一個空白編碼，因為判斷錯誤訊息是否顯示的條件是 空字串/非空字串
      },
    };

    const warningText = warningValueI18n(errMsg);

    return shareExampleErr[errMsg](warningText);
  }

  // 預設錯誤訊息
  defaultErr(ruleName, inputName, otherInfo = '') {
    const warningText = warningValueI18n(ruleName);

    const defaultErrMsg = {
      legal4Y4M2D() {
        return `請選擇${inputName}`;
      },
      isSelect() {
        return `請選擇${inputName}`;
      },
      hasText() {
        return `請輸入${inputName}`;
      },
      lessStringLenth() {
        return `${inputName}長度不可超過${otherInfo}位數`;
      },
      overStringLength() {
        return `${inputName}長度需至少${otherInfo}位數`;
      },
      phoneFormat() {
        return `${inputName}格式錯誤`;
      },
      isMamdarin() {
        return `${inputName}僅可輸入中文`;
      },
      isEnglish() {
        return `${inputName}僅可輸入英文`;
      },
      emailFormat() {
        return `${inputName}僅可使用E-mail`;
      },
      isOverSomeYear() {
        return `${inputName}需滿${otherInfo}年`;
      },
    };

    return defaultErrMsg[ruleName](warningText);
  }

  // 回傳錯誤訊息
  errMsg(ruleName, inputName, otherInfo = {}) {
    let errMsg = '';

    if (otherInfo.errMsg === undefined) {
      errMsg = this.defaultErr(ruleName, inputName, otherInfo);
    } else {
      errMsg = this.customErr(otherInfo.errMsg);
    }

    return {
      ruleName,
      inputName,
      errInfo: errMsg,
      isPass: false,
    };
  }

  // 將驗證規則加入陣列
  add(args) {
    // 第三個參數有多少個規則，就跑幾次迴圈
    const { value, inputName, ruleList } = args;

    ruleList.forEach((item, index) => {
      const ruleAndMsg = item.split('-');
      const rule = ruleAndMsg[0];
      const msg = ruleAndMsg[1] || undefined;
      const argsArr = rule.split(':'); // 如果規則帶有參數(冒號後面)

      this.ruleList.push(() => {
        const strategy = argsArr[0];

        value.errMsg = msg;
        argsArr.push(value);
        argsArr.push(inputName);

        return this.formValidateStrategies[strategy].apply(this, argsArr);
      });
    });
  }

  // 開始驗證
  start() {
    for (const item of this.ruleList) {
      const msg = item();

      if (msg) {
        return msg;
      }
    }

    return {
      ruleName: '',
      inputName: '',
      errInfo: '',
      isPass: true,
    };
  }
}

// 可以直接引入用來驗證;
function pureValidator(innerValue, otherValue, labelName = '', ruleList) {
  const params = {
    value: {
      value: innerValue,
      otherValue: otherValue || '',
    },
    inputName: labelName,
    ruleList,
  };

  const validator = new Validator();
  validator.add(params);
  const result = validator.start();

  return result;
}

//

export { Validator };
