<template>
  <div class="re-menu">
    <ul class="re-main-menu">
      <li class="re-main-menu__item" v-for="mainMenu of menuConfig" :key="mainMenu.meta.authGroup">
        <p class="re-main-menu__item__title">{{ mainMenu.meta.title }}</p>
        <ul class="re-sub-menu" v-if="mainMenu.children">
          <li
            class="re-sub-menu__item"
            :class="{ 're-sub-menu__item--active': subMenu.name === $route.name }"
            v-for="subMenu of mainMenu.children"
            :key="subMenu.meta.authItem"
            @click="toPage(subMenu.name)"
          >
            <p class="re-sub-menu__item__text">{{ subMenu.meta.title.split(' ')[0] }}</p>
            <p class="re-sub-menu__item__text">{{ subMenu.meta.title.split(' ')[1] }}</p>
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

<style lang="scss" scoped>
.re-menu {
  min-width: 200px;
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
    @include font-style($c-text1, 14px);
    transition: 0.4s;

    &:hover {
      color: $c-aside-hover;
    }

    &--active {
      color: $c-aside-hover;
    }

    &__text {
      cursor: pointer;

      & + & {
        margin-top: 5px;
      }
    }
  }
}
</style>
