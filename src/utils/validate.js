// const initVld = ({ trigger }= { trigger: []}) => {

//   return

// };

function vld({ value, ruleList }) {
  console.log('value', value);
  console.log('ruleList', ruleList);

  return new Error('err ?');
  // return true;
}

function asyncVld({ value, ruleList }) {
  return new Promise((resolve, reject) => {
    // 先驗證同步的，若通過了，再往下驗證非同步的
    if (Number(value) < 10) {
      reject('同步錯誤');
    }

    setTimeout(() => {
      const t = Math.floor(Math.random() * 5);
      if (t > Number(value)) {
        resolve();
      } else {
        reject('非同步錯誤');
      }
    }, 1000);
  });
}

export { vld, asyncVld };
