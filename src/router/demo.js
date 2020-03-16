export default [
  {
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: "Demo" */ '@/views/demoTplt/Demo.vue'),
  },
  {
    path: '/demo/table',
    name: 'demoTable',
    component: () => import(/* webpackChunkName: "Table" */ '@/views/demoTplt/Table.vue'),
  },
];
