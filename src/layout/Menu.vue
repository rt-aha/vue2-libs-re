<template>
  <div class="r-menu">
    <ul class="main-menu__list">
      <li class="main-menu__list__item" v-for="menu of menuList" :key="menu.meta.title">
        <p class="main-menu__list__item__title" @click="handleExpand(menu.name)">{{ menu.meta.title }}</p>
        <template v-if="menu.children && expandStatus[menu.name]">
          <ul class="sub-menu__list">
            <li class="sub-menu__list__item" v-for="subMenu of menu.children" :key="subMenu.meta.title" @click="handleRoute(subMenu.name)">
              <span class="sub-menu__list__item__text" :class="activeRoute === subMenu.name && 'sub-menu__list__item__text--active'">{{ subMenu.meta.title }}</span>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import menuList from '@/router/genMenu';

export default {
  name: 'Menu',
  data() {
    return {
      menuList,
      expandStatus: [],
      handleExpand: () => {},
    };
  },
  created() {
    this.genExpandStatus();
    // closure
    this.handleExpand = this.initExpandStatus();
    this.handleExpand(this.$route.meta.mainCategoryType);
  },
  computed: {
    activeRoute() {
      return this.$route.name;
    },
  },
  methods: {
    genExpandStatus() {
      this.expandStatus = menuList.reduce((obj, ele) => {
        obj[ele.name] = false;
        return obj;
      }, {});
    },
    initExpandStatus() {
      let currExpandMenu = '';

      return (name) => {
        // 若點到一樣的的，展開和收合交替
        if (name === currExpandMenu) {
          this.expandStatus[name] = !this.expandStatus[name];
        } else {
          // 若不相同，把原本展開的關閉
          this.expandStatus[currExpandMenu] = false;
          this.expandStatus[name] = true;
          currExpandMenu = name;
        }
      };
    },
    handleRoute(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
.r-menu {
  @include box-padding(10px);
  text-align: left;

}

.main-menu {

  &__list {

    &__item {

      &__title {
        @include box-padding(10px);
        @include font-style($c-white, 14px);
        cursor: pointer;

      }
    }
  }
}

.sub-menu {

  &__list {

    &__item {
      @include box-padding(10px);

      &__text {
        @include font-style($c-assist, 14px, 300);
        cursor: pointer;

        &--active {
          font-weight: 400;
        }
      }
    }
  }
}
</style>
