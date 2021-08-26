import regExps from '@/utils/validate/regExp';
// 測試用 start
export const t1 = (value, errMsg, rule, args) => {
  if (value.length > 3) {
    return true;
  }

  return false;
};
export const t2 = (value, errMsg, rule, args) => {
  if (Number(value) > 3) {
    return true;
  }
  return false;
};
// 測試用 end

export const vldRequired = (value, errMsg, rule, args) => {
  if (value) {
    return true;
  }

  return false;
};

export const vldLengthMoreThen = (value, errMsg, rule, args = 6) => {
  if (value.length >= args) {
    return true;
  }

  return false;
};

export const vldEmail = (value, errMsg, rule, args) => {
  if (value) {
    return regExps.email.test(value);
  }

  return false;
};

export const vldAllEmail = (value, errMsg, rule, args) => {
  if (value) {
    return value.every((item) => regExps.email.test(item.value));
  }

  return false;
};
