const regExps = {
  // TODO: 整理

  name: /^[\u4e00-\u9fa5A-Za-z0-9~!@#$%^&*()_+{}|:"<>?[\]\\;',./\s]+$/,
  noSigns: /^[\u4e00-\u9fa5|\w|\d|a-zA-Z|\-|_]+$/,
  number: /^([0-9]){0,20}$/,

  // NOTE: 已整理
  integer: /^[0-9]\d*$/,
  normalSign: /^[~!@#$%^&*()_+{}|:"<>?[\]\\;',./\s]*$/,
  mamdarin: /^[\u4E00-\u9FA5]*$/, // 符合中文
  alphebat: /^[a-zA-Z]*$/,
  numeric: /^[-]?[0-9]+(.)?[0-9]*$/,
  numericAndDot: /^[0-9.]*$/,
  alphebatOrNumeric: /^[a-zA-Z0-9]*$/,
  integerAlphebatNormalSign: /^[0-9a-zA-Z~!@#$%^&*()_+{}|:"<>?[\]\\;',./\s]*$/,
  mamdarinIntegerAlphebatNormalSign: /^[\u4E00-\u9FA50-9a-zA-Z~!@#$%^&*()_+{}|:"<>?[\]\\;',./\s]*$/,
  // TODO: 待刪
  email: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
  // eslint-disable-next-line no-useless-escape
  url: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g,
  pwd: /^[A-Za-z0-9\s\-~!@#$%^&*()_+{}|:"<>?[\]\\;',./]+$/,
  ip: /^([0,1]?\d{1,2}|2([0-4][0-9]|5[0-5]))(\.([0,1]?\d{1,2}|2([0-4][0-9]|5[0-5]))){3}$/,
};

export default regExps;
