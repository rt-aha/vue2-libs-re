import NoLayout from '@/layout/NoLayout.vue';

export default [
  {
    path: '/form',
    name: 'form',
    component: NoLayout,
    children: [
      {
        path: 'input',
        name: 'form-input',
        component: () => import(/* webpackChunkName: "form-input" */ '@/views/form/Input.vue'),
        meta: {
          title: '輸入框 ReInput',
          authGroup: 'form',
          authItem: 'form-input',
        },
      },
      {
        path: 'switch',
        name: 'form-switch',
        component: () => import(/* webpackChunkName: "form-switch" */ '@/views/form/Switch.vue'),
        meta: {
          title: '開關 ReSwitch',
          authGroup: 'form',
          authItem: 'form-switch',
        },
      },
    ],
    meta: {
      title: '表單 Form',
      authGroup: 'form',
    },
    order: 2,
  },
];
