<template>
  <div>
    <ul class="sub-menu-list">
      <li class="sub-menu-item" @click="handleRouteChange($attrs.subMenu.name)">
        <span class="sub-menu-title">
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

.menu-transition {
  transition: 0.35s ease-in-out;
}

.sub-menu {
  &-item {
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
