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
      {
        path: 'data-tree',
        name: 'data-tree',
        component: () => import(/* webpackChunkName: "data-tree" */ '@/views/data/Tree.vue'),
        meta: {
          title: '樹形 ReTree',
          authGroup: 'data',
          authItem: 'data-tree',
        },
      },
      {
        path: 'data-badge',
        name: 'data-badge',
        component: () => import(/* webpackChunkName: "data-badge" */ '@/views/data/Badge.vue'),
        meta: {
          title: '標記 ReBadge',
          authGroup: 'data',
          authItem: 'data-badge',
        },
      },
      {
        path: 'data-avatar',
        name: 'data-avatar',
        component: () => import(/* webpackChunkName: "data-avatar" */ '@/views/data/Avatar.vue'),
        meta: {
          title: '頭像 ReAvatar',
          authGroup: 'data',
          authItem: 'data-avatar',
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
