import NoLayout from '@/layout/NoLayout.vue';
import routeOrder from '@/config/routeOrder';

export default [
  {
    path: '/basic',
    name: 'basic',
    component: NoLayout,
    children: [
      {
        path: 'basic-button',
        name: 'basic-button',
        component: () => import(/* webpackChunkName: "basic-button" */ '@/views/basic/Button.vue'),
        meta: {
          title: 'ĉé ReButton',
          authGroup: 'basic',
          authItem: 'basic-button',
        },
      },
    ],
    meta: {
      title: 'ċşç¤ basics',
      authGroup: 'basics',
      authItem: 'basics',
    },
    order: routeOrder.basic,
  },
];
