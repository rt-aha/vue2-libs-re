// 錯誤碼
import errMsg from '@m/utils/errMsg';
// 回應
import { resOk, resError, resOkWithPage, resOkWithZeroMatch } from '@m/utils/responseFormat';

class TpltController {
  async tplt(ctx) {
    ctx.status = 200;
    ctx.body = { test: 'hello ' };
    return;
  }
}

export default TpltController;
