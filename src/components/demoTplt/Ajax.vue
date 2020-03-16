<template>
  <div>
    ajax
  </div>
</template>

<script>
import { handleTpltMockAPI } from '@/services/tpltService';
export default {
  name: 'Ajax',
  methods: {
    tpltAjax() {
      console.log('tplt is working ...');
      handleTpltMockAPI();
    }
  },
  created() {
    this.tpltAjax();
  }

};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>