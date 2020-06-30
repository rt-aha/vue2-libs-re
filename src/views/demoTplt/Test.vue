<template>
  <div>
    {{ $route.name }}
  </div>
</template>

<script>
import { handleTpltAPI, handleTpltMockAPI } from '@/services/tpltService';

export default {
  name: 'Test',
  created() {
    handleTpltAPI();
    handleTpltMockAPI();
  }
}
</script>

<style lang="scss" scoped>
</style>