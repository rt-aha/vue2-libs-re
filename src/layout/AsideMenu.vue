<template>
  <div class="aside-menu">
    <MainMenu v-for="menu of menuData" :key="menu.title" :menu="menu" @expendMenu="expendMenu">
      <CollapseTransition>
        <div ref="subMenuWrapper" :data-name="menu.children" v-if="menuSwitch[menu.name]">
          <SubMenu v-for="subMenu of menu.children" :key="subMenu.title" :subMenu="subMenu"> </SubMenu>
        </div>
      </CollapseTransition>
    </MainMenu>
  </div>
</template>

<script>
import { menuRoutes } from '@/router';
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
      menuData: menuRoutes,
      activeMenu: 'tplt1',
      menuSwitch: {},
      allowMultiExpand: false, // 是否允許同時開多個menu
      loaded: false,
    };
  },
  methods: {
    expendMenu(activeMenu) {
      if (this.allowMultiExpand) {
        this.expendMultiMenu(activeMenu);
      } else {
        this.expendSingleMenu(activeMenu);
      }
    },
    expendSingleMenu(activeMenu) {
      this.activeMenu = activeMenu;
      for (const key in this.menuSwitch) {
        this.menuSwitch[key] = false;
      }
      this.menuSwitch[activeMenu] = true;
    },
    expendMultiMenu(activeMenu) {
      this.menuSwitch[activeMenu] = !this.menuSwitch[activeMenu];
    },
    // 動態生成開關
    generateMenuSwitch() {
      const obj = {};
      for (const item of menuRoutes) {
        obj[item.name] = false;
      }

      this.menuSwitch = obj;
    },
  },

  created() {
    this.generateMenuSwitch();
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
