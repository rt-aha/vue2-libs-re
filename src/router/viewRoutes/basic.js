import NoLayout from '@/layout/NoLayout.vue';

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
          title: '按鈕 ReButton',
          authGroup: 'basic',
          authItem: 'basic-button',
        },
      },
    ],
    meta: {
      title: '基礎 basics',
      authGroup: 'basics',
      authItem: 'basics',
    },
    order: 2,
  },
];
