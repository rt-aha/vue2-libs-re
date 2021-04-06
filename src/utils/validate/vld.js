import validator from '@/utils/validate/helper';

function vld({
  value = '',
  ruleList = [],
  ruleError = {},
  options,
}) {
  validator.add(value, ruleList, ruleError, options);
  const result = validator.start();

  if (result.pass) return true;
  return new Error(result.msg);
  // return true;
}

function asyncVld({
  value = '',
  ruleList = [],
  ruleError = {},
  options,
  asyncFn,
}) {
  return new Promise((resolve, reject) => {
    // 先驗證同步的，若通過了，再往下驗證非同步的
    if (ruleList.length > 0) {
      validator.add(value, ruleList, ruleError, options);
      const result = validator.start();

      if (result.msg) {
        return reject(result.msg);
      }
    }

    asyncFn().then((res) => {
      if (res.error) {
        reject(res.error);
      } else {
        resolve();
      }
    });
  });
}

export { vld, asyncVld };
