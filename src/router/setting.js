export default [
  {
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "FullAsideLayout" */ '@/layout/FullAsideLayout.vue'),
    children: [
      {
        path: 'news',
        name: 'news',
        component: () => import(/* webpackChunkName: "News" */ '@/views/setting/News.vue'),
        meta: {
          title: '公告管理',
          mainCategoryType: 'setting',
        },
      },
      {
        path: 'carousel',
        name: 'carousel',
        component: () => import(/* webpackChunkName: "Carousel" */ '@/views/setting/Carousel.vue'),
        meta: {
          title: '輪播管理',
          mainCategoryType: 'setting',
        },
      },
      {
        path: 'merchant',
        name: 'merchant',
        component: () => import(/* webpackChunkName: "Merchant" */ '@/views/setting/Merchant.vue'),
        meta: {
          title: '商品上架',
          mainCategoryType: 'setting',
        },
      },
    ],
    meta: {
      title: '設定',
      mainCategoryType: 'setting',
    },
  },
];
