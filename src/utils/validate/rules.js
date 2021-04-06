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
