<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { routeObservable } from '@/observable/route';
import writeMenuList from '@/mixins/writeMenuList';

export default {
  name: 'App',
  mixins: [writeMenuList],
  computed: {
    menuList() {
      return routeObservable.menuList;
    },

  },
  created() {
    this.writeMenuList('app');
  },
};
</script>
