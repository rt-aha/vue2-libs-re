<template>
  <div class="aside-menu">
    <ul class="main-menu-list"
        v-for="mainMenu of menuData"
        :key="mainMenu.title">
      <li class="main-menu-item">
        <div class="main-menu-box">
          <div class="main-menu-icon">111</div>
          <p class="main-menu-title">{{mainMenu.title}}</p>
          <div class="main-menu-icon">222</div>
        </div>

        <div v-if="mainMenu.subMenu"
             class="sub-menu-box">
          <ul class="sub-menu-list"
              v-for="subMenu of mainMenu.subMenu"
              :key="subMenu.title">
            <li class="sub-menu-item"
                @click="toXPage({name:subMenu.name})">
              <span class="sub-menu-title">
                {{subMenu.meta.title}}
              </span>
            </li>
          </ul>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import menuData from '@/layout/menuData';

export default {
  name: 'AsideMenu',
  data() {
    return {
      menuData: menuData
    };
  },
  created() {
    console.log('m', menuData);
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.aside-menu {
  @include box-padding(15px);
}

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

.sub-menu {
  &-item {
    height: 50px;
    display: flex;
    align-items: center;
    @include box-padding(0 0 0 50px);
    background-color: #ddd;
    cursor: pointer;
  }
}
</style>