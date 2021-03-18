<template>
  <div class="ly ly-base-layout">
    <component :is="layout">
      <template #header>hhh</template>
      <template #aside>aaa</template>
      <router-view />
    </component>
  </div>
</template>

<script>
import FullHeaderLayout from '@/layout/FullHeaderLayout.vue';

export default {
  name: 'BaseLayout',
  components: {
    FullHeaderLayout,
  },
  props: {
    layout: {
      type: String,
      default: 'FullHeaderLayout',
    },
  },
};
</script>
