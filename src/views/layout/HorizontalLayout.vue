<template>
  <div class="page-horizontal-layout">
    <re-horizontal-layout>
      <template v-slot:aside> aside </template>
      <template v-slot:body>
        <re-layout-header />
        <router-view />
      </template>
    </re-horizontal-layout>
  </div>
</template>

<script>
import ReHorizontalLayout from '@/layout/ReHorizontalLayout.vue';
import ReLayoutHeader from '@/layout/ReLayoutHeader.vue';

export default {
  name: 'HorizontalLayout',
  components: {
    ReHorizontalLayout,
    ReLayoutHeader,
  },

  data() {
    const { SYSTEM_NAME: systemName } = this;

    return {
      isInit: true,
      menuList: [],
      systemName,
    };
  },
};
</script>

<style lang="scss" scoped>
.page-horizontal-layout {
  width: 100%;
  height: 100%;
}
</style>
