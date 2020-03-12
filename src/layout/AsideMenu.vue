<template>
  <div class="aside-menu"
       :class="{ 'avoid-flash': !loaded }">
    <MainMenu v-for="mainMenu of menuData"
              :key="mainMenu.title"
              :mainMenu="mainMenu"
              @handleExpendMenu="handleExpendMenu">

      <CollapseTransition>
        <div ref="subMenuWrapper"
             :data-name="mainMenu.name"
             v-if="menuInfo[mainMenu.name].show">
          <SubMenu v-for="subMenu of mainMenu.subMenu"
                   :key="subMenu.title"
                   :subMenu="subMenu"> </SubMenu>
        </div>
      </CollapseTransition>
    </MainMenu>
  </div>
</template>

<script>
import menuData from '@/layout/menuData';
import SubMenu from '@/layout/SubMenu';
import MainMenu from '@/layout/MainMenu';
import CollapseTransition from '@/layout/CollapseTransition';

export default {
  name: 'AsideMenu',
  components: {
    SubMenu,
    MainMenu,
    CollapseTransition,
  },
  data() {
    return {
      menuData: menuData,
      activeMenu: 'tplt1',
      menuInfo: {
        tplt1: {
          show: false,
          height: 0,
        },
        tplt2: {
          show: false,
          height: 0,
        },
      },
      loaded: false,
    };
  },
  methods: {
    handleExpendMenu(activeMenu) {
      this.activeMenu = activeMenu;
      for (const key in this.menuInfo) {
        this.menuInfo[key].show = false;
      }
      this.menuInfo[activeMenu].show = true;
    },
  },
};
</script>

<style lang="scss" scoped data-custom="ttt">
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

    &:hover {
      background-color: #bbb;
    }
  }
}
</style>
