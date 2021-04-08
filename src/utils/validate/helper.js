import * as allRules from '@/utils/validate/rules';
import * as defaultErrorMessage from '@/utils/validate/defaultErrorMessage';

const validator = {
  ruleList: [],

  vldFunc(value, errMsg, rule, args, options) {
    // console.log('value', value);
    const validate = {
      ...allRules,
    };

    const isPass = validate[rule](value, errMsg, rule, args, options);

    if (!isPass) {
      return this.errMsg(errMsg, rule, args);
    }
  },

  // 預設錯誤訊息
  defaultError(rule, args) {
    const defaultErrMsg = {
      ...defaultErrorMessage,
    };

    return defaultErrMsg[rule](args);
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
      pass: false,
    };
  },

  // 將驗證規則加入陣列
  add(value, rules, error, options) {
    rules.forEach((r) => {
      const rule = r.split(':')[0]; // 規則名稱
      const args = r.split(':')[1] || null; // 額外參數
      const errMsg = rule in error ? error[rule] : '';

      // const vv = value ? `${value}` : undefined;
      // console.log('check vv', vv);
      // 記錄現在驗證的資訊

      this.ruleList.push(() => this.vldFunc.call(this, value, errMsg, rule, args, options));
      // this.ruleList.push(() => {
      //   const vv = value;
      //   console.log('v2', 1, value, 2, errMsg, 3, rule, 4, args, 5, options);
      //   return this.vldFunc.call(this, vv, errMsg, rule, args, options);
      // });
      // this.ruleList.push([vv, errMsg, rule, args, options]);
    });
  },

  // 開始驗證
  start() {
    for (const fn of this.ruleList) {
      const msg = fn();
      // console.log('check fn', [...fn]);
      // const msg = this.vldFunc(...fn);

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
