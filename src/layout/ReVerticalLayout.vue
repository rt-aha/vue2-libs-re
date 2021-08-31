<template>
  <div class="ly-vertical-layout">
    <header class="ly__header">
      <slot name="header" />
    </header>
    <div class="ly__body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReVerticalLayout',
};
</script>

<style lang="scss" scoped>
.ly-vertical-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ly {
  &__header {
    flex: none;
    width: 100%;
    height: auto;
  }

  &__body {
    display: flex;
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
