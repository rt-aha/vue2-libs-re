<template>
  <div class="aside-menu" :class="{ 'avoid-flash': !loaded }">
    <MainMenu
      v-for="mainMenu of menuData"
      :key="mainMenu.title"
      :mainMenu="mainMenu"
      @handleExpendMenu="handleExpendMenu"
    >
      <!-- <transition
        name="fade"
        v-on:before-enter="beforeEnter"
        v-on:after-enter="afterEnter"
        v-on:enter="enter"
        v-on:before-leave="beforeLeave"
      > -->
      <CollapseTransition>
        <div ref="subMenuWrapper" :data-name="mainMenu.name" v-if="menuInfo[mainMenu.name].show">
          <SubMenu v-for="subMenu of mainMenu.subMenu" :key="subMenu.title" :subMenu="subMenu"> </SubMenu>
        </div>
      </CollapseTransition>
      <!-- </transition> -->
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
          show: true,
          height: 0,
        },
        tplt2: {
          show: true,
          height: 0,
        },
      },
      loaded: false,
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.height = '50px';
      el.style.overflow = 'hidden';
    },
    afterEnter: function(el) {
      console.log(el);
      // this.addCSS(`.fade-leave,.fade-enter-to {height: ${this.menuInfo[this.activeMenu].height}px; overflow: hidden;}`);
    },
    enter: function(el) {
      console.log(el);
      console.log('enter');
      // this.addCSS(`.fade-leave,.fade-enter-to {height: ${this.menuInfo[this.activeMenu].height}px; overflow: hidden;}`);
    },

    beforeLeave: function(el) {
      console.log(el);
      // this.addCSS(`.fade-leave,.fade-enter-to {height: ${this.menuInfo[this.activeMenu].height}px; overflow: hidden;}`);
    },
    handleExpendMenu(activeMenu) {
      this.activeMenu = activeMenu;
      for (const key in this.menuInfo) {
        this.menuInfo[key].show = false;
      }
      this.menuInfo[activeMenu].show = true;
      // this.addCSS(`.fade-leave,.fade-enter-to {height: ${this.menuInfo[activeMenu].height}px; overflow: hidden;}`);
    },
    handleRouteChange(name) {
      this.toXPage({ name });
    },

    // 取得所有子表單高度
    calcHeight() {
      this.menuData = this.menuData.map(ele => {
        this.$refs.subMenuWrapper.forEach(ele => {
          const dataName = ele.getAttribute('data-name');
          const eleHeight = ele.clientHeight;
          this.menuInfo[dataName].height = eleHeight;
        });

        return ele;
      });
    },
    // 關閉所有子表單
    closeSubMenu() {
      for (const key in this.menuInfo) {
        console.log(this.menuInfo[key]);
        this.menuInfo[key].show = false;
      }
    },
    showMenu() {
      this.loaded = true;
    },
  },
  mounted() {
    // 為了避免渲染時閃爍，但計算高度需要渲染元素，所以一開始用透明
    // 計算高度(透明) --> 不顯示子導覽列 --> 顯示導覽列(不透明)
    this.calcHeight();
    this.closeSubMenu();
    this.showMenu();
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
