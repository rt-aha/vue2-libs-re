<template>
  <ul class="main-menu-list">
    <li class="main-menu-item">
      <div class="main-menu-box" @click="handleExpendMenu($attrs.menu.name)">
        <div class="main-menu-icon">111</div>
        <p class="main-menu-title">{{ $attrs.menu.meta.title }}</p>
        <div class="main-menu-icon">222</div>
      </div>
      <slot></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MainMenu',
  methods: {
    handleExpendMenu(activeMenu) {
      this.$emit('expendMenu', activeMenu);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.main-menu {
  &-box {
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #aaa;
    cursor: pointer;
  }

  &-icon {
    flex: none;
    width: 50px;
    text-align: center;
  }

  &-title {
    flex: 1;
  }

  &-icon {
    flex: none;
    width: 50px;
    text-align: center;
  }
}
</style>
