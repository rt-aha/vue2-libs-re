<template>
  <div class="page-horizontal-layout">
    <re-vertical-layout>
      <template v-slot:header>
        <re-layout-header />
      </template>
      <template v-slot:body>
        vertical-body
        <router-view />
      </template>
    </re-vertical-layout>
  </div>
</template>

<script>
import ReVerticalLayout from '@/layout/ReVerticalLayout.vue';
import ReLayoutHeader from '@/layout/ReLayoutHeader.vue';

export default {
  name: 'VerticalLayout',
  components: {
    ReVerticalLayout,
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
