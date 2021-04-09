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
        component: () => import(/* webpackChunkName: "Form" */ '@/views/comps/FormTesting.vue'),
        meta: {
          title: '一般組件',
          mainCategoryType: 'components',
        },
      },
      {
        path: 'table',
        name: 'table',
        component: () => import(/* webpackChunkName: "Table" */ '@/views/comps/TablePage.vue'),
        meta: {
          title: '表格組件',
          mainCategoryType: 'components',
        },
      },
      {
        path: 'test',
        name: 'test',
        component: () => import(/* webpackChunkName: "Test" */ '@/views/play/Test.vue'),
        meta: {
          title: '測試用頁面',
          mainCategoryType: 'components',
        },
      },
      {
        path: 'accordion',
        name: 'accordion',
        component: () => import(/* webpackChunkName: "accordion" */ '@/views/comps/AccordionPage.vue'),
        meta: {
          title: '手風琴',
          mainCategoryType: 'components',
        },
      },
      {
        path: 'carousel',
        name: 'carousel',
        component: () => import(/* webpackChunkName: "Carousel" */ '@/views/comps/CarouselPage.vue'),
        meta: {
          title: '輪播',
          mainCategoryType: 'components',
        },
      },
      {
        path: 'render',
        name: 'render',
        component: () => import(/* webpackChunkName: "Render" */ '@/views/play/Render.vue'),
        meta: {
          title: '測試用頁面',
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
