// 使用方式: controller資料夾中新增檔案寫api function，引入後，下面寫router路徑再配對應的controller中對應的function

const Router = require('koa-router');
const router = Router();
const tpltController = require('../controller/tplt');

// mock 跟路徑測試用
router.get('/', ctx => {
  ctx.body = 'hello, this is server with mock api!';
});

// tplt
router.get('/api/tplt1', tpltController.tplt1);
router.get('/api/tplt2', tpltController.tplt2);

module.exports = router;
