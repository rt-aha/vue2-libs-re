<template>
  <div>
    <ul class="sub-menu">
      <li
        class="sub-menu__item"
        @click="handleRouteChange($attrs.subMenu.name)"
      >
        <span>
          {{ $attrs.subMenu.meta.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SubMenu',
  methods: {
    handleRouteChange(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.sub-menu {
  &__item {
    height: 50px;
    display: flex;
    align-items: center;
    @include box-padding(0 0 0 50px);
    background-color: #ddd;
    cursor: pointer;

    &:hover {
      background-color: #bbb;
    }
  }
}
</style>
