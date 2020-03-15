// 錯誤碼
import errMsg from '@m/utils/errMsg';
// 回應
// 根據後端api spec撰寫相應的格式
// import { resOk, resError, resOkWithPage, resOkWithZeroMatch } from '../utils/responseFormat';

class MockController {
  async mock(ctx) {
    ctx.status = 200;
    ctx.body = { mock: "this response return by '/mock'" };
    return;
  }
}

export default MockController;
