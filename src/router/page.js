import Home from '@/views/Home.vue';
export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '*',
    name: 'page404',
    component: () => import('@/views/Page404.vue')
  }
];
