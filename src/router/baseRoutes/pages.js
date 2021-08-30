export default [
  {
    path: '/',
    name: 'root',
    component: () => import(/* webpackChunkName: "root" */ '@/views/Root.vue'),
    meta: {
      title: '根路由',
      mainCategoryType: 'page',
    },
  },
  {
    path: '/ui-lab',
    name: 'ui-lab',
    component: () => import(/* webpackChunkName: "ui-lab" */ '@/views/UiLab.vue'),
  },
  {
    path: '/general',
    name: 'general',
    component: () => import(/* webpackChunkName: "ui-lab" */ '@/views/comps/General.vue'),
  },
];
