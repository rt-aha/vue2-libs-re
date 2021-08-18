<template>
  <div class="page-ui-lab">
    <re-vertical-layout>
      <template v-slot:header>
        <re-layout-header title="Re-UI Labotary" />
      </template>
      <template v-slot:body>
        <re-layout-aside />
        <router-view />
      </template>
    </re-vertical-layout>
  </div>
</template>

<script>
import ReVerticalLayout from '@/layout/ReVerticalLayout.vue';
import ReLayoutHeader from '@/layout/ReLayoutHeader.vue';
import ReLayoutAside from '@/layout/ReLayoutAside.vue';

export default {
  name: 'UiLab',
  components: {
    ReVerticalLayout,
    ReLayoutHeader,
    ReLayoutAside,
  },
};
</script>

<style lang="scss">
.page-ui-lab {
  width: 100%;
  height: 100%;
}
</style>
