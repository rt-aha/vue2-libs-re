import Router from 'koa-router';
const router = Router();

import MockController from '@m/controller/mock';
import TpltController from '@m/controller/tplt';

const mockController = new MockController();
const tpltController = new TpltController();

// 測試用
router
  .get('/', ctx => {
    ctx.body = 'hello, this is server with mock api!';
  })
  .get('/mock', tpltController.mock);

// mock
router.post('/api/tplt', mockController.tplt);

export default router;
