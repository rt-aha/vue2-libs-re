<template>

  <ul class="main-menu-list">
    <li class="main-menu-item">
      <div class="main-menu-box"
           @click="handleExpendMenu($attrs.mainMenu.name)">
        <div class="main-menu-icon">111</div>
        <p class="main-menu-title">{{$attrs.mainMenu.title}}</p>
        <div class="main-menu-icon">222</div>
      </div>
      <div ref="ele3"
           class="aaa"
           :style="`height: ${height}`">
        <slot></slot>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return {
      height: '0px'
    };
  },
  methods: {
    handleRouteChange(name) {
      this.toXPage({ name });
    },
    handleExpendMenu(activeMenu) {

      this.$emit('handleExpendMenu', activeMenu);
    },
    calcHeight() {
      console.log(this.$refs.ele3.clientHeight);
      // console.log(this.$refs.ele3[0].clientHeight);
      // console.log(this.$refs.ele3[1].clientHeight);

      this.height = this.$refs.ele3.clientHeight + 'px';
      console.log(this.height);
    },
  },
  mounted() {
    this.calcHeight();
  },
  updated() {
    this.calcHeight();
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

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
</style>