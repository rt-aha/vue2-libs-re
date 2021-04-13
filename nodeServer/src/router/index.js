import Router from 'koa-router';
import ctrls from '../controllers';

console.log('ctrls', ctrls);

const router = new Router();

router.get('/', (ctx) => ctrls.root(ctx));
router.get('/test/table', (ctx) => ctrls.table(ctx));
router.post('/send/email', (ctx) => ctrls.email(ctx));
router.get('/auth/permission', (ctx) => ctrls.permission(ctx));
router.get('/stock/dividend', (ctx) => ctrls.dividend(ctx));
router.get('/stock/semicondcutor', (ctx) => ctrls.semicondcutor(ctx));

export default router;
