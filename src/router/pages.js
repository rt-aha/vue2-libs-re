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
      // {
      //   path: 'home',
      //   name: 'home',
      //   component: Home,
      //   meta: {
      //     title: '首頁',
      //     mainCategoryType: 'page',
      //   },
      // },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Dashboard.vue'),
        meta: {
          title: '總覽',
          mainCategoryType: 'page',
        },
      },
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
  // {
  //   path: '*',
  //   name: 'page404',
  //   component: () => import(/* webpackChunkName: "Page404" */ '@/views/Page404.vue'),
  //   meta: {
  //     title: '404',
  //   },
  // },
];
