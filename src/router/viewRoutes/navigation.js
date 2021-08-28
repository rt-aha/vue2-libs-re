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
      {
        path: 'menu',
        name: 'navigation-menu',
        component: () => import(/* webpackChunkName: "navigation-menu" */ '@/views/navigation/Menu.vue'),
        meta: {
          title: '導覽菜單 ReMenu',
          authGroup: 'navigation',
          authItem: 'navigation-menu',
        },
      },
      {
        path: 'breadcrumb',
        name: 'navigation-breadcrumb',
        component: () => import(/* webpackChunkName: "navigation-breadcrumb" */ '@/views/navigation/Breadcrumb.vue'),
        meta: {
          title: '麵包屑 ReBreadcrumb',
          authGroup: 'navigation',
          authItem: 'navigation-breadcrumb',
        },
      },
      {
        path: 'steps',
        name: 'navigation-steps',
        component: () => import(/* webpackChunkName: "navigation-steps" */ '@/views/navigation/Steps.vue'),
        meta: {
          title: '頁籤 ReSteps',
          authGroup: 'navigation',
          authItem: 'navigation-steps',
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
