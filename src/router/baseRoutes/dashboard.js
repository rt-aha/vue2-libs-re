export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard',
    // component: FullAsideLayout,
    component: () => import(/* webpackChunkName: "FullAsideLayout" */ '@/layout/FullAsideLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboardHome',
        component: () => import(/* webpackChunkName: "AccountList" */ '@/views/Dashboard.vue'),
        meta: {
          title: '儀錶板',
          mainCategoryType: 'dashboard',
          authCode: 'H-1',
        },
      },
    ],
    meta: {
      title: '儀錶板',
      mainCategoryType: 'dashboard',
      // order: ,
    },
  },
];
