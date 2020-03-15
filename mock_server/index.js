const Koa = require('koa');
const koajwt = require('koa-jwt');
const app = new Koa();
const jwtPrivateKey = require('./config/keys');

// 錯誤回應
const { resError } = require('./utils/responseFormat');
// 錯誤代碼
const errMsg = require('./utils/errMsg');

// 跨域
const cors = require('@koa/cors');
app.use(cors());

// 預設解析為json
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 引入路由
const router = require('./router');

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
// app.use(
//   koajwt({
//     secret: jwtPrivateKey,
//   }).unless({
//     path: [/tplt.router/],
//   }),
// );

app.use(router.routes());

app.listen(11111, () => {
  console.log('listen on 11111 port ...');
});
