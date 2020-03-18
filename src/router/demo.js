export default [
  {
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: "Demo" */ '@/views/demoTplt/Demo.vue'),
    meta: {
      title: 'demo',
    },
  },
  {
    path: '/demo/table',
    name: 'table',
    component: () => import(/* webpackChunkName: "Table" */ '@/views/demoTplt/Table.vue'),
    meta: {
      title: 'demo-table',
    },
  },
];
