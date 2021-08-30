import NoLayout from '@/layout/NoLayout.vue';
import routeOrder from '@/config/routeOrder';

export default [
  {
    path: '/dev',
    name: 'dev',
    component: NoLayout,
    children: [
      {
        path: 'desc',
        name: 'dev-desc',
        component: () => import(/* webpackChunkName: "dev-desc" */ '@/views/dev/Desc.vue'),
        meta: {
          title: '敘述 ReDevDesc',
          authGroup: 'dev',
          authItem: 'dev-desc',
        },
      },
    ],
    meta: {
      title: '開發 dev',
      authGroup: 'dev',
    },
    order: routeOrder.dev,
  },
];
