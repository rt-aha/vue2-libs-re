<template>
  <div class="ly-horizontal-layout">
    <div class="ly__aside">
      <slot name="aside" />
    </div>
    <div class="ly__body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReHorizontalLayout',
  components: {},

  data() {
    const { SYSTEM_NAME: systemName } = this;

    return {
      isInit: true,
      menuList: [],
      systemName,
    };
  },
};
</script>

<style lang="scss">
.ly-horizontal-layout {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ly {
  &__aside {
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
  }

  &__body {
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;
    overflow: scroll;
  }
}
</style>
