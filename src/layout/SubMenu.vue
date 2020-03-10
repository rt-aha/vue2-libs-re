<template>
  <!-- <transition name="ver-slide"> -->
  <!-- <div class="menu-transition"
       ref="ele"
       v-show="$attrs.mainMenuName === $attrs.activeMenu"
       :style="`height: ${height}`">
    <ul class="sub-menu-list">
      <li class="sub-menu-item"
          @click="handleRouteChange($attrs.subMenu.name)">
        <span class="sub-menu-title">
          {{$attrs.subMenu.meta.title}}
        </span>
      </li>
    </ul>
  </div> -->

  <div>
    <ul class="sub-menu-list"
        ref="ele">
      <li class="sub-menu-item"
          @click="handleRouteChange($attrs.subMenu.name)">
        <span class="sub-menu-title">
          {{$attrs.subMenu.meta.title}}
        </span>
      </li>
    </ul>
  </div>

  <!-- </transition> -->
</template>

<script>
export default {
  name: 'MenuTransition',
  data() {
    return {
      height: '0',
      // innerMenuObj: {}
    };
  },
  props: {
    // menuObj: {
    //   default: {}
    // }
  },
  mounted() {
    this.calcHeight();
  },
  updated() {
    // this.calcHeight();
  },
  computed: {

  },
  methods: {
    calcHeight() {
      console.log(this.$refs);
      this.height = this.$refs.ele.clientHeight + 'px';
      console.log(this.height);
    },
    handleRouteChange(name) {
      this.toXPage({ name });
    },
  },
  watch: {
    // menuObj: {
    //   handler() {
    //     this.innerMenuObj = this.menuObj;
    //   },
    //   immediate: true
    // }
  }

};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.menu-transition {
  transition: 0.35s ease-in-out;
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
  height: auto;
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