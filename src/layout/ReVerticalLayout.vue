<template>
  <div class="ly-full-header-layout">
    <header class="ly-fh__header">
      <slot name="header" />
    </header>
    <div class="ly-fh__body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReVerticalLayout',
};
</script>

<style lang="scss">
.ly-full-header-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ly-fh {
  &__header {
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }

  &__body {
    display: flex;
    height: 100%;
    @include box-padding(60px 0 0);

    &__aside {
      flex: none;
      width: 200px;
      height: 100%;
      overflow-y: auto;
    }

    &__body {
      flex: 1;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
