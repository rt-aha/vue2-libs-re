<template>
  <div class="aside-menu-layout-com">
    <Menu
      v-for="menu of menuData"
      :key="menu.title"
      :menu="menu"
      @expendMenu="expendMenu"
    >
      <CollapseTransition>
        <div
          ref="subMenuWrapper"
          :data-name="menu.children"
          v-if="menuSwitch[menu.name]"
        >
          <SubMenu
            v-for="subMenu of menu.children"
            :key="subMenu.title"
            :subMenu="subMenu"
          > </SubMenu>
        </div>
      </CollapseTransition>
    </Menu>
  </div>
</template>

<script>
import { menuRoutes } from '@/router';
import SubMenu from '@/layout/components/SubMenu';
import Menu from '@/layout/components/Menu';
import CollapseTransition from '@/layout/components/CollapseTransition';

export default {
  name: 'AsideMenu',
  components: {
    SubMenu,
    Menu,
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
.aside-menu-layout-com {
  @include box-padding(15px);
}
</style>
