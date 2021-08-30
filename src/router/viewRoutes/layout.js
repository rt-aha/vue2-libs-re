import NoLayout from '@/layout/NoLayout.vue';
import routeOrder from '@/config/routeOrder';

export default [
  {
    path: '/layout',
    name: 'layout',
    component: NoLayout,
    children: [
      {
        path: 'layout-horizontal',
        name: 'layout-horizontal',
        component: () => import(/* webpackChunkName: "HorizontalLayout" */ '@/views/layout/HorizontalLayout.vue'),
        meta: {
          title: '水平佈局 ReLayoutHorizontal',
          authGroup: 'layout',
          authItem: 'layout-horizontal',
        },
      },
      {
        path: 'layout-vertical',
        name: 'layout-vertical',
        component: () => import(/* webpackChunkName: "VerticalLayout" */ '@/views/layout/VerticalLayout.vue'),
        meta: {
          title: '垂直佈局 ReLayoutVertical',
          authGroup: 'layout',
          authItem: 'layout-vertical',
        },
      },
    ],
    meta: {
      title: '佈局 Layout',
      authGroup: 'layout',
      authItem: 'layout',
    },
    order: routeOrder.layout,
  },
];
