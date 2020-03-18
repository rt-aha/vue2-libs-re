import Login from '@/views/Login.vue';
export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登入',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Dashboard.vue'),
    meta: {
      title: '首頁',
    },
  },
  {
    path: '*',
    name: 'page404',
    component: () => import(/* webpackChunkName: "Page404" */ '@/views/Page404.vue'),
    meta: {
      title: '404',
    },
  },
];
