<template>
  <div>
    <CusSearch :searchConfig="searchConfig" />
  </div>
</template>

<script>
import CusSearch from '@/components/custom/CusSearch.vue';
import { searchConfig } from '@/config/tpltConfig';

export default {
  name: 'Search',
  components: {
    CusSearch
  },
  data() {
    return {
      searchConfig
    };
  }
}
</script>

<style lang="scss" scoped>
</style>