import NoLayout from '@/layout/NoLayout.vue';

export default [
  {
    path: '/layout',
    name: 'layout',
    component: NoLayout,
    children: [
      {
        path: 'horizontal-layout',
        name: 'horizontal-layout',
        component: () => import(/* webpackChunkName: "HorizontalLayout" */ '@/views/layout/HorizontalLayout.vue'),
        meta: {
          title: '水平佈局',
          mainCategoryType: 'layout',
          authCode: 'layout-1',
        },
      },
      {
        path: 'vertical-layout',
        name: 'vertical-layout',
        component: () => import(/* webpackChunkName: "VerticalLayout" */ '@/views/layout/VerticalLayout.vue'),
        meta: {
          title: '垂直佈局',
          mainCategoryType: 'layout',
          authCode: 'layout-2',
        },
      },
    ],
    meta: {
      title: '佈局 Demo',
      mainCategoryType: 'layout',
      authCode: 'layout',
    },
  },
];
