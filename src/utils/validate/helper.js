import * as allRules from '@/utils/validate/rules';
import * as errorMessage from '@/utils/validate/errorMessage';

const validator = {
  ruleList: [],

  vldFunc(value, ruleError, rule, args, options) {
    const validate = {
      ...allRules,
    };

    const isPass = validate[rule](value, ruleError, rule, args, options);

    if (!isPass) {
      return this.errMsg(ruleError, rule, args, options);
    }
  },

  // 取得錯誤訊息
  getErrorMessage(rule, args, options) {
    const defaultErrMsg = {
      ...errorMessage,
    };

    return defaultErrMsg[rule](args, options);
  },

  // 回傳錯誤訊息
  errMsg(ruleError, rule, args, options) {
    let msg = '';
    if (rule in ruleError) {
      msg = this.getErrorMessage(ruleError[rule], args, options);
    } else {
      msg = this.getErrorMessage(rule, args, options);
    }

    return {
      rule,
      msg,
      pass: false,
    };
  },

  // 將驗證規則加入陣列
  add(value, rules, ruleError, options) {
    rules.forEach((r) => {
      const rule = r.split(':')[0]; // 規則名稱
      const args = r.split(':')[1] || null; // 額外參數

      this.ruleList.push(() => this.vldFunc.call(this, value, ruleError, rule, args, options));
    });
  },

  // 開始驗證
  start() {
    for (const fn of this.ruleList) {
      const msg = fn();

      if (msg) {
        this.cleanRuleList();
        return msg;
      }
    }

    this.cleanRuleList();
    return {
      pass: true,
    };
  },

  cleanRuleList() {
    this.ruleList = [];
  },
};

export default validator;
