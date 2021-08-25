import NoLayout from '@/layout/NoLayout.vue';

export default [
  {
    path: '/navigation',
    name: 'navigation',
    component: NoLayout,
    children: [
      {
        path: 'tabs',
        name: 'navigation-tabs',
        component: () => import(/* webpackChunkName: "navigation-tabs" */ '@/views/navigation/Tabs.vue'),
        meta: {
          title: '頁籤 ReTabs',
          authGroup: 'navigation',
          authItem: 'navigation-tabs',
        },
      },
    ],
    meta: {
      title: '導航 Navigation',
      authGroup: 'navigation',
    },
    order: 3,
  },
];
