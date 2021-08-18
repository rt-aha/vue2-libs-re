<template>
  <div class="ly-full-aside-layout">
    <div class="ly-fa__aside">
      <slot name="aside" />
    </div>
    <div class="ly-fa__body">
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
.ly-full-aside-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
}

.ly-fa {
  &__header {
    height: 100%;
    width: 200px;
    overflow-y: auto;
    background-color: $c-aside;
  }

  &__right {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;

    &__header {
      flex: none;
      height: 60px;
    }

    &__body {
      flex: 1;
      overflow-y: auto;
      @include box-padding(15px);
    }
  }
}

.system-name-box {
  text-align: center;
  @include box-padding(15px);

  &__text {
    display: inline-block;
    @include font-style($c-white, 30px);
  }
}
</style>
