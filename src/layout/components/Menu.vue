<template>
  <ul class="menu__list">
    <li class="menu__item">
      <div
        class="menu__box"
        @click="handleExpendMenu($attrs.menu.name)"
      >
        <div class="menu__icon">111</div>
        <p class="menu__title">{{ $attrs.menu.meta.title }}</p>
        <div class="menu__icon">222</div>
      </div>
      <slot></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    handleExpendMenu(activeMenu) {
      this.$emit('expendMenu', activeMenu);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  &__box {
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #aaa;
    cursor: pointer;
  }

  &__icon {
    flex: none;
    width: 50px;
    text-align: center;
  }

  &__title {
    flex: 1;
  }
}
</style>
