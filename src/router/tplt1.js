export default [
  {
    path: '/tplt1',
    name: 'tplt1',
    redirect: { name: 'tplt1_1' },
    component: () => import(/* webpackChunkName: "viewsIndex" */ '@/views/index.vue'),
    meta: {
      title: '主頁一',
    },
    children: [
      {
        path: 'tplt1_1',
        name: 'tplt1_1',
        component: () => import(/* webpackChunkName: "tplt1_1" */ '@/views/tplt1/Tplt1_1.vue'),
        meta: {
          title: '模板一之一',
        },
      },
    ],
  },
];
