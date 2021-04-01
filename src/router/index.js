import Vue from 'vue';
import Router from 'vue-router';
import { baseRoute } from '@/router/routes';

const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: baseRoute,
});

export default router;
