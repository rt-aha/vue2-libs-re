export default [
  {
    path: '/stock',
    name: 'stock',
    component: () => import(/* webpackChunkName: "FullAsideLayout" */ '@/layout/FullAsideLayout.vue'),
    children: [
      {
        path: 'dividend-list',
        name: 'dividendList',
        component: () => import(/* webpackChunkName: "DividendList" */ '@/views/stock/DividendList.vue'),
        meta: {
          title: '股利',
          mainCategoryType: 'stock',
          authCode: 'S-1',
        },
      },
      {
        path: 'semiconductor',
        name: 'semiconductor',
        component: () => import(/* webpackChunkName: "Semiconductor" */ '@/views/stock/Semiconductor.vue'),
        meta: {
          title: '半導體',
          mainCategoryType: 'stock',
          authCode: 'S-2',
        },
      },
    ],
    meta: {
      title: '股市',
      mainCategoryType: 'stock',
      authCode: 'S',
      // order: ,
    },
  },
];
