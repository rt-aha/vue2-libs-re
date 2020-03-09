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
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Dashboard.vue'),
  },
  {
    path: '*',
    name: 'page404',
    component: () => import(/* webpackChunkName: "Page404" */ '@/views/Page404.vue'),
  },
];
