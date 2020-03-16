<template>
  <div>
    <p class="err-text"
       v-show="$attrs.errMsg !== ''">{{ $attrs.errMsg }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrMsg'
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.err-text {
  color: #f00;
}
</style>