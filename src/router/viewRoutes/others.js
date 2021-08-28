import NoLayout from '@/layout/NoLayout.vue';

export default [
  {
    path: '/others',
    name: 'others',
    component: NoLayout,
    children: [
      {
        path: 'others-Dialog',
        name: 'others-Dialog',
        component: () => import(/* webpackChunkName: "others-dialog" */ '@/views/others/Dialog.vue'),
        meta: {
          title: '彈窗 ReDialog',
          authGroup: 'others',
          authItem: 'others-Dialog',
        },
      },
      {
        path: 'others-drawer',
        name: 'others-drawer',
        component: () => import(/* webpackChunkName: "others-drawer" */ '@/views/others/Drawer.vue'),
        meta: {
          title: '抽屜 ReDrawer',
          authGroup: 'others',
          authItem: 'others-drawer',
        },
      },
      {
        path: 'others-tooltip',
        name: 'others-tooltip',
        component: () => import(/* webpackChunkName: "others-tooltip" */ '@/views/others/Tooltip.vue'),
        meta: {
          title: '文字提示 ReTooltip',
          authGroup: 'others',
          authItem: 'others-tooltip',
        },
      },
      {
        path: 'others-calendar',
        name: 'others-calendar',
        component: () => import(/* webpackChunkName: "others-calendar" */ '@/views/others/Calendar.vue'),
        meta: {
          title: '日曆 ReCalendar',
          authGroup: 'others',
          authItem: 'others-calendar',
        },
      },
      {
        path: 'others-divider',
        name: 'others-divider',
        component: () => import(/* webpackChunkName: "others-divider" */ '@/views/others/Divider.vue'),
        meta: {
          title: '抽屜 ReDivider',
          authGroup: 'others',
          authItem: 'others-divider',
        },
      },
      {
        path: 'others-backtop',
        name: 'others-backtop',
        component: () => import(/* webpackChunkName: "others-backtop" */ '@/views/others/Backtop.vue'),
        meta: {
          title: '抽屜 ReBacktop',
          authGroup: 'others',
          authItem: 'others-backtop',
        },
      },
    ],
    meta: {
      title: '其他 others',
      authGroup: 'others',
      authItem: 'others',
    },
    order: 2,
  },
];
