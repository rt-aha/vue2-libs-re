import NoLayout from '@/layout/NoLayout.vue';
import routeOrder from '@/config/routeOrder';

export default [
  {
    path: '/widget',
    name: 'widget',
    component: NoLayout,
    children: [
      {
        path: 'widget-form',
        name: 'widget-form',
        component: () => import(/* webpackChunkName: "widget-form" */ '@/views/widget/Form.vue'),
        meta: {
          title: '表單 ReWidgetForm',
          authGroup: 'widget',
          authItem: 'widget-form',
        },
        props: {
          aaa: '111',
        },
      },
      {
        path: 'widget-search',
        name: 'widget-search',
        component: () => import(/* webpackChunkName: "widget-search" */ '@/views/widget/Search.vue'),
        meta: {
          title: '搜尋 ReSearch',
          authGroup: 'widget',
          authItem: 'widget-search',
        },
      },
      {
        path: 'widget-table-with-search',
        name: 'widget-table-with-search',
        component: () =>
          import(/* webpackChunkName: "widget-table-with-search" */ '@/views/widget/TableWithSearch.vue'),
        meta: {
          title: '搜尋與表格模板 ReWidgetTableWithSearch',
          authGroup: 'widget',
          authItem: 'widget-table-with-search',
        },
      },
      {
        path: 'widget-accordion',
        name: 'widget-carousel',
        component: () => import(/* webpackChunkName: "widget-carousel" */ '@/views/widgets/Carousel.vue'),
        meta: {
          title: '幻燈片 ReCarousel',
          authGroup: 'widget',
          authItem: 'widget-carousel',
        },
      },
      {
        path: 'widget-accordion',
        name: 'widget-accordion',
        component: () => import(/* webpackChunkName: "widget-accordion" */ '@/views/widgets/Accordion.vue'),
        meta: {
          title: '手風琴 ReAccordion',
          authGroup: 'widget',
          authItem: 'widget-accordion',
        },
      },
      {
        path: 'widget-rich-text-editor',
        name: 'widget-rich-text-editor',
        component: () => import(/* webpackChunkName: "widget-rich-text-editor" */ '@/views/widgets/RichTextEditor.vue'),
        meta: {
          title: '富文本編輯器 ReRichTextEditor',
          authGroup: 'widget',
          authItem: 'widget-rich-text-editor',
        },
      },
      {
        path: 'widget-markdown-editor',
        name: 'widget-markdown-editor',
        component: () => import(/* webpackChunkName: "widget-markdown-editor" */ '@/views/widgets/MarkdownEditor.vue'),
        meta: {
          title: 'Markdown編輯器 ReMarkdownEditor',
          authGroup: 'widget',
          authItem: 'widget-markdown-editor',
        },
      },
    ],
    meta: {
      title: '小工具 widget',
      authGroup: 'widget',
      authItem: 'widget',
    },
    order: routeOrder.widget,
  },
];
