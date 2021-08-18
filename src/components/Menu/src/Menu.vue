<template>
  <div class="re-menu">
    <ul class="re-main-menu">
      <li class="re-main-menu__item" v-for="mainMenu of menuConfig" :key="mainMenu.meta.authGroup">
        <p class="re-main-menu__item__title">{{ mainMenu.meta.title }}</p>
        <ul class="re-sub-menu" v-if="mainMenu.children">
          <li class="re-sub-menu__item" v-for="subMenu of mainMenu.children" :key="subMenu.meta.authItem">
            <p class="re-sub-menu__item__text" @click="toPage(subMenu.name)">{{ subMenu.meta.title }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ReMenu',
  props: {
    menuConfig: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toPage(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style lang="scss">
.re-menu {
  min-width: 240px;
}

.re-main-menu {
  &__item {
    &__title {
      @include box-padding(10px 15px);
      @include font-style($c-main, 16px);
    }
  }
}

.re-sub-menu {
  &__item {
    @include box-padding(10px 15px);

    &__text {
      @include font-style($c-text1, 14px);
      cursor: pointer;
    }
  }
}
</style>
