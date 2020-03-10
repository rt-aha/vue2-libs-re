export default [
  {
    path: '/demo/ui',
    name: 'demoUI',
    component: () => import(/* webpackChunkName: "uiDemo" */ '@/views/demo/UI.vue'),
  },
  {
    path: '/demo/validate',
    name: 'demoValidate',
    component: () => import(/* webpackChunkName: "uiDemo" */ '@/views/demo/Validate.vue'),
  },
];
