// import FullAsideLayout from '@/layout/FullAsideLayout.vue';

export default [
  {
    path: '/account',
    name: 'account',
    // component: FullAsideLayout,
    component: () => import(/* webpackChunkName: "FullAsideLayout" */ '@/layout/FullAsideLayout.vue'),
    children: [
      {
        path: 'account-list',
        name: 'accounList',
        component: () => import(/* webpackChunkName: "AccountList" */ '@/views/account/AccountList.vue'),
        meta: {
          title: '帳號列表',
          mainCategoryType: 'account',
        },
        children: [
          {
            path: 'detail',
            name: 'accountListDetail',
            component: () => import(/* webpackChunkName: "AccountListDetail" */ '@/views/account/AccountListDetail.vue'),
            meta: {
              title: '帳號詳細',
              mainCategoryType: 'account',
            },
          },
        ],
      },
      {
        path: 'permission-list',
        name: 'permissionList',
        component: () => import(/* webpackChunkName: "PermissionList" */ '@/views/account/PermissionList.vue'),
        meta: {
          title: '權限列表',
          mainCategoryType: 'account',
        },
      },
    ],
    meta: {
      title: '帳號管理',
      mainCategoryType: 'account',
    },
  },
];
