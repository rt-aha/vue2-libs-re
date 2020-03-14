<template>
  <div>
    ajax
  </div>
</template>

<script>
import { handleTpltAPI } from '@/services/tpltService';
export default {
  name: 'Ajax',
  methods: {
    tpltAjax() {
      console.log('tplt is working ...');
      handleTpltAPI();
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