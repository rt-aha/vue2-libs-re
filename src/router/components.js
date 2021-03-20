import NoLayout from '@/layout/NoLayout.vue';

export default [
  {
    path: '/components',
    name: 'components',
    component: NoLayout,
    // component: () => import(/* webpackChunkName: "FullAsideLayout" */ '@/layout/FullAsideLayout.vue'),
    children: [
      {
        path: 'general',
        name: 'general',
        component: () => import(/* webpackChunkName: "General" */ '@/views/comps/General.vue'),
        meta: {
          title: '一般組件',
          mainCategoryType: 'components',
        },
      },
      {
        path: 'form',
        name: 'form',
        component: () => import(/* webpackChunkName: "Form" */ '@/views/comps/Form.vue'),
        meta: {
          title: '一般組件',
          mainCategoryType: 'components',
        },
      },
      {
        path: 'table',
        name: 'table',
        component: () => import(/* webpackChunkName: "Table" */ '@/views/comps/Table.vue'),
        meta: {
          title: '表格組件',
          mainCategoryType: 'components',
        },
      },
    ],
    meta: {
      title: '組件',
      mainCategoryType: 'components',
    },
  },
];
