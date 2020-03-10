<template>
  <div class="aside-menu">
    <MainMenu v-for="mainMenu of menuData"
              :key="mainMenu.title"
              :mainMenu="mainMenu"
              @handleExpendMenu="handleExpendMenu">
      <div v-show="menuObj[mainMenu.name]"
           ref="ele2">
        <SubMenu v-for="subMenu of mainMenu.subMenu"
                 :key="subMenu.title"
                 :subMenu="subMenu"
                 :mainMenuName="mainMenu.name"
                 :activeMenu="activeMenu"
                 :menuObj="menuObj">
          <!-- v-show="mainMenu.name === activeMenu" -->
        </SubMenu>
      </div>
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
      }
    };
  },

  methods: {
    handleExpendMenu(activeMenu) {
      console.log(activeMenu);
      for (const item in this.menuObj) {
        this.menuObj[item] = false;
      }

      this.menuObj[activeMenu] = true;
      // this.activeMenu = activeMenu;
    },
    handleRouteChange(name) {
      this.toXPage({ name });

    },
    calcHeight() {
      console.log(this.$refs.ele2);
      console.log(this.$refs.ele2[0].clientHeight);
      console.log(this.$refs.ele2[1].clientHeight);

      this.height = this.$refs.ele2.clientHeight + 'px';
      console.log(this.height);
    },
  },
  created() {
    console.log('m', menuData);
  },
  updated() {
    // this.calcHeight();
  },
  mounted() {
    this.calcHeight();
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

    &:hover {
      background-color: #bbb;
    }
  }
}

// transition

.ver-slide-enter-active,
.ver-slide-leave-active {
  transition: 0.35s ease-in-out;
}
.ver-slide-enter {
  height: 0px;
}

.ver-slide-enter-to {
  height: 50px;
}

.ver-slide-leave {
  height: auto;
}

.ver-slide-leave-to {
  height: 0px;
}

.slide {
  width: 300px;
  background: blue;
  padding-top: 20px;
  transform-origin: left top;
  transition: all 0.5s ease;
}
.slideinner {
  width: 200px;
  height: 200px;
  background: #000;
  transform-origin: left top;
}
</style>