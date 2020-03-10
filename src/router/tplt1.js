export default [
  {
    path: '/tplt1_1',
    name: 'tplt1_1',
    component: () => import(/* webpackChunkName: "tplt1_1" */ '@/views/tplt1/Tplt1_1.vue'),
    meta: {
      title: '模板一之一',
    },
  },
];
