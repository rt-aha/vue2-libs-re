<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import { routeObservable } from '@/observable/route';
// import writeDynamicRoutes from '@/mixins/writeDynamicRoutes';

export default {
  name: 'App',
  // mixins: [writeDynamicRoutes],
  // computed: {
  //   menuList() {
  //     return routeObservable.menuList;
  //   },

  // },
  // created() {
  //   this.writeDynamicRoutes('app');
  // },
};
</script>
