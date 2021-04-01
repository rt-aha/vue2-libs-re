export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard',
    // component: FullAsideLayout,
    component: () => import(/* webpackChunkName: "FullAsideLayout" */ '@/layout/FullAsideLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'dashboardHome',
        component: () => import(/* webpackChunkName: "AccountList" */ '@/views/Dashboard.vue'),
        meta: {
          title: '帳號列表',
          mainCategoryType: 'account',
          authCode: 'A-1',
        },
      },
    ],
    meta: {
      title: '儀錶板',
      mainCategoryType: 'dashboardRoot',
      // order: ,
    },
  },
];
