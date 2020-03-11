<template>
  <div class="aside-menu">
    <MainMenu v-for="mainMenu of menuData"
              :key="mainMenu.title"
              :mainMenu="mainMenu"
              @handleExpendMenu="handleExpendMenu"
              :mainMenuName="mainMenu.name"
              :activeMenu="activeMenu"
              :menuObj="menuObj"
              :h="mainMenu.height ? mainMenu.height : ''">
      <transition name="fade">

        <div ref="subMenuWrapper"
             :data-name="mainMenu.name"
             v-if="menuObj[mainMenu.name]">
          <SubMenu v-for="subMenu of mainMenu.subMenu"
                   :key="subMenu.title"
                   :subMenu="subMenu">
          </SubMenu>
        </div>
        <!-- <div ref="ele2"
             v-if="test">
          <SubMenu v-for="subMenu of mainMenu.subMenu"
                   :key="subMenu.title"
                   :subMenu="subMenu">
          </SubMenu>
        </div> -->
      </transition>
    </MainMenu>
  </div>
</template>

<script>
import menuData from '@/layout/menuData';
import SubMenu from '@/layout/SubMenu';
import MainMenu from '@/layout/MainMenu';


export default {
  name: 'AsideMenu',
  components: {
    SubMenu,
    MainMenu
  },
  data() {
    return {
      menuData: menuData,
      activeMenu: 'tplt1',
      menuObj: {
        tplt1: true,
        tplt2: true,
      },
      menuHeight: {

      },
      // menuObj: {},
      test: true
    };
  },

  methods: {
    handleExpendMenu(activeMenu, currName) {
      if (this.menuObj[activeMenu]) return;

      console.log('currName', currName);
      for (const item in this.menuObj) {
        this.menuObj[item] = false;
      }

      this.menuObj[activeMenu] = true;

      console.log(this.menuObj.tplt1, this.menuObj.tplt2);

      this.addCSS(`.fade-leave,.fade-enter-to {height: ${this.menuHeight[activeMenu]}px; overflow: hidden;}`);

      this.test = !this.test;

    },
    handleRouteChange(name) {
      this.toXPage({ name });
    },
    calcHeight() {
      this.menuData = this.menuData.map((ele, index) => {
        this.$refs.subMenuWrapper.forEach((ele) => {
          const dataName = ele.getAttribute('data-name');
          const eleHeight = ele.clientHeight;

          this.menuHeight[ele.getAttribute('data-name')] = eleHeight;
        });

        return ele;
      });
    },
    beforeEnter() {
      console.log('beforeEnter~');
    },

    returnFalse() {
      for (const key in this.menuObj) {
        this.menuObj[key] = false;
      }
    }

  },
  created() {
    // this.generateMenuObj();
    console.log('m', menuData);
  },
  updated() {

  },
  mounted() {

    this.calcHeight();
    this.returnFalse();
    // this.addCSS('.demo{ width: 30px; height: 30px; background:#f00;}');
    // this.addCSS('.fade-enter,.fade-leave-to {height: 0px;overflow: hidden;}');
  }
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

// transition

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}

// .fade-leave,
// .fade-enter-to {
//   height: 50px;
//   overflow: hidden;
// }
.fade-enter,
.fade-leave-to {
  height: 0px;
  overflow: hidden;
}
</style>