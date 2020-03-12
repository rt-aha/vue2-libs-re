// import dayjs from 'dayjs';
// import { IvalidateParams, IvalidateResult } from '@/interface/validateTyping';

// // 引入i18n中的所有 validator.ts
// import VueI18n from 'vue-i18n';
// import { validatorMsg } from '@/i18n';
// import Vue from 'vue';
// import cookie from 'cookiejs';
// Vue.use(VueI18n);

// let lang: string = location.pathname.split('/')[1];

// const availableLangList: string[] = ['zh-tw', 'zh-cn', 'en', 'id', 'my', 'th', 'vn'];
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

// // 暫時沒有function用到
// // const validationRegex: any = {
// //   Email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
// //   PasswordLength: /.{6,16}/, // 密碼長度
// //   PasswordMix: /^(?=.*\d)(?=.*[a-z])/, // 密碼可用字元(數字與大小寫字母)
// //   PasswordLetter: /[A-Z]/, // 至少一個大寫字母
// //   PasswordContent: /^(?=.{6,16})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, // 密碼組合(必須有數字與大小寫字母)
// // };

// // 取得i18n翻譯
// function warningValueI18n(key: string) {
//   const firstLetter = key.slice(0, 1).toUpperCase();
//   const splitKeys = key.split('');
//   splitKeys.splice(0, 1, firstLetter);
//   const warningText: string = splitKeys.join('');

//   const errMsgObj: { [key: string]: string } | string = {};

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

// class Validator {
//   public ruleList: any[] = [];

//   // 封裝若干策略
//   public formValidateStrategies: { [key: string]: any } = {
//     isMoreThenAmount(ruleName: string, validateData: any, inputName: string) {
//       if (validateData.value > validateData.otherValue.balance) {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     isEmptyCheckbox(ruleName: string, validateData: any, inputName: string) {
//       if (validateData.value.length === 0) {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     isSelectCountry(ruleName: string, validateData: any, inputName: string) {
//       if (!validateData.value) {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//       // 國家回傳的是一個物件，所以要在取裡面的值出來
//       if (validateData.value.value === '') {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },

//     legalYMD(ruleName: string, validateData: any, inputName: string) {
//       // 日期格式必須是 'YYYY-MM-DD'
//       const YMDReg: RegExp = /\d{4}-\d{2}-\d{2}/;

//       if (!YMDReg.test(validateData.value)) {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     notSelect(ruleName: string, validateData: any, inputName: string) {
//       if (validateData.value === null || validateData.value === -1 || validateData.value === '') {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     notSelectDate(ruleName: string, validateData: any, inputName: string) {
//       if (
//         validateData.value === null ||
//         validateData.value === -1 ||
//         validateData.value === '' ||
//         validateData.value === 0
//       ) {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     isEmpty(ruleName: string, validateData: any, inputName: string) {
//       if (validateData.value.trim() === '') {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     stringLength(ruleName: string, length: number = 6, validateData: any, inputName: string) {
//       if (validateData.value.trim().length < Number(length)) {
//         validateData.length = length;
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     phoneFormat(ruleName: string, validateData: any, inputName: string) {
//       const regExp = /^09\d{8}$/;
//       if (!regExp.test(validateData.value)) {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     phoneFormatForCN(ruleName: string, validateData: any, inputName: string) {
//       const regExp = /^1[23456789]\d{9}$/;
//       if (!regExp.test(validateData.value)) {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     isMamdarin(ruleName: string, validateData: any, inputName: string) {
//       const regExp = /[^\u4E00-\u9FA5]/g;
//       if (regExp.test(validateData.value)) {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     isEnglish(ruleName: string, validateData: any, inputName: string) {
//       const regExp = /[a-zA-Z]/g;
//       if (!regExp.test(validateData.value)) {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     isNumber(ruleName: string, validateData: any, inputName: string) {
//       const valueInt: number = +validateData.value;
//       // 類別為物件或NaN(NaN在js類型為Number)直接給錯誤訊息
//       if (typeof validateData.value === 'object' || isNaN(validateData.value)) {
//         console.log('111');
//         return this.errMsg(ruleName, inputName, validateData);
//       }

//       if (typeof valueInt !== 'number') {
//         console.log('222');
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     emailFormat(ruleName: string, validateData: any, inputName: string) {
//       const regExp = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
//       if (!regExp.test(validateData.value)) {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//     isOverSomeYear(ruleName: string, yearLength: number = 6, validateData: any, inputName: string) {
//       yearLength = Number(yearLength);

//       const day: string = dayjs(validateData.value).format('YYYY-MM-DD');

//       const compareDayArr = day.split('-');
//       const compareDayYMD = {
//         y: Number(compareDayArr[0]),
//         m: Number(compareDayArr[1]),
//         d: Number(compareDayArr[2]),
//       };

//       const today = new Date();
//       const todayYMD = {
//         y: today.getFullYear(),
//         m: today.getMonth() + 1,
//         d: today.getDate(),
//       };

//       if (todayYMD.y - compareDayYMD.y < yearLength) {
//         validateData.length = Number(yearLength);

//         return this.errMsg(ruleName, inputName, validateData);
//       }

//       if (todayYMD.y - compareDayYMD.y === yearLength) {
//         if (todayYMD.m - compareDayYMD.m < 0 || todayYMD.d - compareDayYMD.d < 0) {
//           validateData.length = Number(yearLength);

//           return this.errMsg(ruleName, inputName, validateData);
//         }
//       }
//     },

//     notNegativeNum(ruleName: string, validateData: any, inputName: string) {
//       const valueInt: number = +validateData.value;
//       if (isNaN(valueInt) || typeof valueInt !== 'number') {
//         return this.errMsg(ruleName, inputName, validateData);
//       }

//       if (valueInt < 0) {
//         return this.errMsg(ruleName, inputName, validateData);
//       }
//     },
//   };

//   // 自定義錯誤訊息
//   public customErr(errMsg: string): string {
//     const shareExampleErr: any = {
//       example(msg: string) {
//         return msg;
//       },
//       empty() {
//         return '\u00a0'; // 保持一個空白編碼，因為判斷錯誤訊息是否顯示的條件是 空字串/非空字串
//       },
//     };

//     const warningText: any = warningValueI18n(errMsg);

//     return shareExampleErr[errMsg](warningText);
//   }

//   // 預設錯誤訊息
//   public defaultErr(ruleName: string, inputName: string, otherInfo: any = '') {
//     const warningText: any = warningValueI18n(ruleName);

//     const defaultErrMsg: any = {
//       isMoreThenAmount(msg: any) {
//         console.log(ruleName, inputName, otherInfo);
//         return `${msg}${otherInfo.otherValue.balance.toFixed(2)}`;
//       },
//       isEmptyCheckbox(msg: any) {
//         return `${msg.warning1}${inputName}`;
//       },
//       isSelectCountry(msg: any) {
//         return `${msg.warning1}${inputName}`;
//       },
//       legalYMD(msg: any) {
//         return `${msg.warning1}${inputName}`;
//       },
//       notSelect(msg: any) {
//         return `${msg.warning1}${inputName}`;
//       },
//       notSelectDate(msg: any) {
//         return `${msg.warning1}${inputName}`;
//       },
//       isEmpty(msg: any) {
//         return `${msg.warning1}${inputName}${msg.warning2}`;
//       },
//       stringLength(msg: any) {
//         return `${inputName}${msg.warning1}${otherInfo.length}${msg.warning2}`;
//       },
//       phoneFormat(msg: any) {
//         return `${inputName}${msg.warning1}`;
//       },
//       phoneFormatForCN(msg: any) {
//         return `${inputName}${msg.warning1}`;
//       },
//       isMamdarin(msg: any) {
//         return `${inputName}${msg.warning1}`;
//       },
//       isEnglish(msg: any) {
//         return `${inputName}${msg.warning1}`;
//       },
//       isNumber(msg: any) {
//         return `${inputName}${msg.warning1}`;
//       },
//       emailFormat(msg: any) {
//         return `${inputName}${msg.warning1}`;
//       },
//       isOverSomeYear(msg: any) {
//         return `${inputName}${msg.warning1}${otherInfo.length}${msg.warning2}`;
//       },
//       notNegativeNum(msg: any) {
//         return `${inputName}${msg}`;
//       },
//     };

//     return defaultErrMsg[ruleName](warningText);
//   }

//   // 回傳錯誤訊息
//   public errMsg(ruleName: string, inputName: string, otherInfo: any = {}) {
//     let errMsg: string = '';

//     if (otherInfo.errMsg === undefined) {
//       errMsg = this.defaultErr(ruleName, inputName, otherInfo);
//     } else {
//       errMsg = this.customErr(otherInfo.errMsg);
//     }

//     return {
//       ruleName,
//       inputName,
//       errInfo: errMsg,
//       isPass: false,
//     };
//   }

//   // 將驗證規則加入陣列
//   public add(args: any) {
//     // 第三個參數有多少個規則，就跑幾次迴圈
//     const { value, inputName, ruleList }: IvalidateParams = args;

//     ruleList.forEach((item: any, index: number) => {
//       const ruleAndMsg = item.split('-');
//       const rule = ruleAndMsg[0];
//       const msg = ruleAndMsg[1] || undefined;
//       const argsArr = rule.split(':'); // 如果規則帶有參數(冒號後面)

//       this.ruleList.push(() => {
//         const strategy: any = argsArr[0];

//         value.errMsg = msg;
//         argsArr.push(value);
//         argsArr.push(inputName);

//         return this.formValidateStrategies[strategy].apply(this, argsArr);
//       });
//     });
//   }

//   // 開始驗證
//   public start() {
//     for (const item of this.ruleList) {
//       const msg = item();

//       if (msg) {
//         return msg;
//       }
//     }

//     return {
//       ruleName: '',
//       inputName: '',
//       errInfo: '',
//       isPass: true,
//     };
//   }
// }

// // 可以直接引入用來驗證;
// function pureValidator(innerValue: any, otherValue: any, labelName: string = '', ruleList: string[]): IvalidateResult {
//   const params: IvalidateParams = {
//     value: {
//       value: innerValue,
//       otherValue: otherValue || '',
//     },
//     inputName: labelName,
//     ruleList,
//   };

//   const validator = new Validator();
//   validator.add(params);
//   const result: IvalidateResult = validator.start();

//   return result;
// }

// //

// export { Validator };
