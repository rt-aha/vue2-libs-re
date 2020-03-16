export default [
  {
    path: '/demo/ui',
    name: 'demoUI',
    component: () => import(/* webpackChunkName: "uiDemo" */ '@/views/demoTplt/UI.vue'),
  },
  {
    path: '/demo/validate',
    name: 'demoValidate',
    component: () => import(/* webpackChunkName: "validate" */ '@/views/demoTplt/Validate.vue'),
  },
  {
    path: '/demo/trans',
    name: 'trans',
    component: () => import(/* webpackChunkName: "trans" */ '@/views/demoTplt/Trans.vue'),
  },
  {
    path: '/demo/ajax',
    name: 'ajax',
    component: () => import(/* webpackChunkName: "ajax" */ '@/views/demoTplt/Ajax.vue'),
  },
];
