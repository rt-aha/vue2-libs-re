export default [
  {
    path: '/demo',
    name: 'demo',
    redirect: { name: 'tplt2_1' },
    component: () => import(/* webpackChunkName: "viewsIndex" */ '@/views/index.vue'),
    meta: {
      title: 'DEMO',
    },
    children: [
      {
        path: 'uiAndValidate',
        name: 'uiAndValidate',
        component: () => import(/* webpackChunkName: "uiAndValidate" */ '@/views/demoTplt/Demo.vue'),
        meta: {
          title: 'demo-ui-validate',
        },
      },
      {
        path: 'demo2',
        name: 'demo2',
        component: () => import(/* webpackChunkName: "demo2" */ '@/views/demoTplt/Demo2.vue'),
        meta: {
          title: 'demo2',
        },
      },
      {
        path: 'table',
        name: 'table',
        component: () => import(/* webpackChunkName: "Table" */ '@/views/demoTplt/Table.vue'),
        meta: {
          title: 'demo-table',
        },
      },
      {
        path: 'test',
        name: 'test',
        component: () => import(/* webpackChunkName: "Test" */ '@/views/demoTplt/Test.vue'),
        meta: {
          title: 'demo-test',
        },
      },
    ],
  },
];
