export default [
  {
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: "Demo" */ '@/views/demoTplt/Demo.vue'),
  },
];
