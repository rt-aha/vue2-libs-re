<template>
  <div class="ly-full-header-layout">
    <header class="ly-fh__header">
      <div class="system-name-box">
        <h1 class="system-name-box__text">[系統名稱]</h1>
      </div>
    </header>
    <div class="ly-fh__ab-wrapper">
      <aside class="ly-fh__ab-wrapper__aside">aside</aside>
      <div class="ly-fh__ab-wrapper__body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullHeaderLayout',
};
</script>

<style lang="scss" scoped>
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

  &__ab-wrapper {
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
