// import Login from '@/views/Login.vue';
import Home from '@/views/Dashboard.vue';
import NoLayout from '@/layout/NoLayout.vue';

export default [
  {
    path: '/',
    redirect: '/login',
    component: NoLayout,
    name: 'root',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
        meta: {
          title: '登入',
          mainCategoryType: 'page',
        },
      },
    ],
    meta: {
      title: '根路由',
      mainCategoryType: 'page',
    },
  },

];
