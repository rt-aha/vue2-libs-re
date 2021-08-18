<template>
  <div class="page-horizontal-layout">
    <re-horizontal-layout>
      <template v-slot:aside>
        aside
        <router-view />
      </template>
      <template v-slot:body>
        <re-layout-header />
        horizontal-body
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
