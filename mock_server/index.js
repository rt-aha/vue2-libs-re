import Koa from 'koa';
import koajwt from 'koa-jwt';
const app = new Koa();
import jwtPrivateKey from '@m/config/keys';

// 錯誤回應
import { resError } from '@m/utils/responseFormat';
// 錯誤代碼
import errMsg from '@m/utils/errMsg';

import cors from '@koa/cors';
app.use(cors());

// 預設解析為json
import bodyParser from 'koa-bodyparser';
app.use(bodyParser());

// 引入路由
import router from '@m/router';

// 錯誤處理
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = resError(errMsg(1001));
    } else {
      throw err;
    }
  });
});

/**
 * 如果有需要驗證bearer token再打開
 *
 * 符合path中正規表達的router不會被驗證
 * */

app.use(
  koajwt({
    secret: jwtPrivateKey,
  }).unless({
    path: [/login/, /test/],
  }),
);

app.use(router.routes());

app.listen(9091, () => {
  console.log('listen on 9091 port ...');
});
