import NoLayout from '@/layout/NoLayout.vue';

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
          title: '敘述 ReDesc',
          authGroup: 'dev',
          authItem: 'dev-desc',
        },
      },
    ],
    meta: {
      title: '開發 dev',
      authGroup: 'dev',
    },
    order: 3,
  },
];
