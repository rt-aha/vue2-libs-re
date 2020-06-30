<template>
  <div class="err-text-wrapper">
    <p
      class="err-text"
      :class="{'err-text-active': $attrs.errMsg !== ''}"
    >{{ $attrs.errMsg }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrMsg'
};
</script>

<style lang="scss" scoped>
.err-text-wrapper {
  margin-top: 5px;
  height: 16px;
  text-align: left;
}

.err-text {
  box-sizing: border-box;

  @include font-style($c-error, $fs-12, $fw-400);
  opacity: 0;
  transition: 0.3s;
}

.err-text-active {
  opacity: 1;
}
</style>
