import NoLayout from '@/layout/NoLayout.vue';

export default [
  {
    path: '/data',
    name: 'data',
    component: NoLayout,
    children: [
      {
        path: 'data-table',
        name: 'data-table',
        component: () => import(/* webpackChunkName: "data-table" */ '@/views/data/Table.vue'),
        meta: {
          title: '表格 ReTable',
          authGroup: 'data',
          authItem: 'data-table',
        },
      },
      {
        path: 'data-search',
        name: 'data-search',
        component: () => import(/* webpackChunkName: "data-search" */ '@/views/data/Search.vue'),
        meta: {
          title: '搜尋 ReSearch',
          authGroup: 'data',
          authItem: 'data-search',
        },
      },
    ],
    meta: {
      title: '資料 data',
      authGroup: 'data',
      authItem: 'data',
    },
    order: 4,
  },
];
