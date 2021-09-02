import NoLayout from '@/layout/NoLayout.vue';
import routeOrder from '@/config/routeOrder';

export default [
  {
    path: '/others',
    name: 'others',
    component: NoLayout,
    children: [
      {
        path: 'others-dialog',
        name: 'others-dialog',
        component: () => import(/* webpackChunkName: "others-dialog" */ '@/views/others/Dialog.vue'),
        meta: {
          title: '彈窗 ReDialog',
          authGroup: 'others',
          authItem: 'others-dialog',
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
          title: '*文字提示 ReTooltip',
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
        path: 'others-timeline',
        name: 'others-timeline',
        component: () => import(/* webpackChunkName: "others-timeline" */ '@/views/others/Timeline.vue'),
        meta: {
          title: '時間軸 ReTimeline',
          authGroup: 'others',
          authItem: 'others-timeline',
        },
      },
      {
        path: 'others-divider',
        name: 'others-divider',
        component: () => import(/* webpackChunkName: "others-divider" */ '@/views/others/Divider.vue'),
        meta: {
          title: '分隔線 ReDivider',
          authGroup: 'others',
          authItem: 'others-divider',
        },
      },
      {
        path: 'others-backtop',
        name: 'others-backtop',
        component: () => import(/* webpackChunkName: "others-backtop" */ '@/views/others/Backtop.vue'),
        meta: {
          title: '回最上 ReBacktop',
          authGroup: 'others',
          authItem: 'others-backtop',
        },
      },
      {
        path: 'others-title',
        name: 'others-title',
        component: () => import(/* webpackChunkName: "others-title" */ '@/views/others/Title.vue'),
        meta: {
          title: '標題 ReTitle',
          authGroup: 'others',
          authItem: 'others-title',
        },
      },
      {
        path: 'others-row',
        name: 'others-row',
        component: () => import(/* webpackChunkName: "others-row" */ '@/views/others/Row.vue'),
        meta: {
          title: '橫向排列 ReRow',
          authGroup: 'others',
          authItem: 'others-row',
        },
      },
      {
        path: 'others-link',
        name: 'others-link',
        component: () => import(/* webpackChunkName: "others-link" */ '@/views/others/Link.vue'),
        meta: {
          title: '連結 ReLink',
          authGroup: 'others',
          authItem: 'others-link',
        },
      },
    ],
    meta: {
      title: '其他 others',
      authGroup: 'others',
      authItem: 'others',
    },
    order: routeOrder.others,
  },
];
