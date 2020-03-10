// 驗證

const regExpList = {
  YMD: /\d{4}-\d{2}-\d{2}/, // 日期格式必須是 'YYYY-MM-DD'
  phoneNumber: /^09\d{8}$/,
  mamdarin: /[^\u4E00-\u9FA5]/g,
  english: /[a-zA-Z]/g,
  emailFormat: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
};

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

  errMsg(ruleName, inputName, otherInfo = '') {
    // 預設錯誤訊息
    const errMsg = {
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

    return {
      ruleName,
      inputName,
      errInfo: errMsg[ruleName](),
    };
  }

  // 增加驗證規則
  add(args) {
    // 第三個參數有多少個規則，就跑幾次迴圈
    const { value, inputName, ruleList } = args;

    for (let i = 0; i < ruleList.length; i++) {
      let argsArr = ruleList[i].split(':'); // 如果規則帶有參數(冒號後面))

      this.ruleList.push(() => {
        const strategy = argsArr[0];
        argsArr.push(value);
        argsArr.push(inputName);

        return this.formValidateStrategies[strategy].apply(this, argsArr);
      });
    }
  }
  // 開始驗證
  start() {
    for (let i = 0; i < this.ruleList.length; i++) {
      const msg = this.ruleList[i]();
      if (msg) {
        return msg;
      }
    }
    return {
      ruleName: '',
      inputName: '',
      errInfo: '',
    };
  }
}

export { Validator };
