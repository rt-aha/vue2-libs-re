export default [
  {
    path: '/tplt2',
    name: 'tplt2',
    redirect: { name: 'tplt2_1' },
    component: () => import(/* webpackChunkName: "viewsIndex" */ '@/views/index.vue'),
    meta: {
      title: '主頁二',
    },
    children: [
      {
        path: 'tplt2_1',
        name: 'tplt2_1',
        component: () => import(/* webpackChunkName: "tplt2_1" */ '@/views/tplt2/Tplt2_1.vue'),
        meta: {
          title: '模板二之一',
        },
      },
      {
        path: 'tplt2_2',
        name: 'tplt2_2',
        component: () => import(/* webpackChunkName: "tplt2_2" */ '@/views/tplt2/Tplt2_2.vue'),
        meta: {
          title: '模板二之二',
        },
      },
    ],
  },
];
