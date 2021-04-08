<template>
  <div class="comp-remove-content">
    <div class="remove-content">
      刪除的內容 ... {{ $attrs.name }}({{ $attrs.symbol }})
    </div>
    <re-row justifyContent="center">
      <re-button @click="handleClose">取消</re-button>
    </re-row>
  </div>
</template>

<script>
export default {
  name: 'RemoveContent',
  methods: {
    handleClose() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.comp-remove-content {
  @include box-padding(10px);
}

.remove-content {
  @include font-style($c-assist, 14px);
}
</style>
