// 錯誤碼
// const errMsg = require('@m/utils/errMsg');

// 回應
// 根據後端api spec撰寫相應的格式
const { resOk, resError, resOkWithPage, resOkWithZeroMatch } = require('../utils/responseFormat');

const Mockjs = require('mockjs');

const tpltController = {
  async tplt1(ctx) {
    ctx.status = 200;
    ctx.body = 'hi this is return by /api/tplt1 !';
  },
  async tplt2(ctx) {
    // tpltData 是一個物件
    const tpltData = Mockjs.mock({
      'data|1-10': [{ 'id|+1': 1 }],
      code: 0,
    });

    ctx.status = 200;
    ctx.body = resOk(tpltData);
  },
};

module.exports = tpltController;
