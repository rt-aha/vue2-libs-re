<template>
  <div class="re-tabs">
     <div class="re-tabs__select">
      <ul class="re-tabs__select__list">
        <li
          class="re-tabs__select__list__item"
          v-for="(tab, index) of tabsPane"
          :key="tab.label + index"
          :ref="tab.label"
          :data-tab-name="tab.name"
          :data-tab-label="tab.label"
          @click.stop="handleClick({ index, ...tab })"
        >
          <span >{{ tab.label }}</span>
        </li>
      </ul>
      <div class="re-tabs__select__current-bar" :style="tabWidth"></div>
    </div>
   <div class="re-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

// import RenderFunction from '@/utils/renderFunction';

export default {
  name: 'ReTabs',

  props: {
    value: {
      type: String,
      defualt: '',
    },
    tabsConfig: {
      type: Array,
      default: () => [],
    },
    currTab: {
      default: '',
    },
  },
  provide() {
    return {
      currTab: () => this.value,
    };
  },
  data() {
    return {
      tabWidth: {},
      allTabsWidth: [],
      tabsPane: [],
    };
  },
  methods: {
    handleClick(tab) {
      this.calcBarStyle(tab);
      this.$emit('change', tab);
    },
    calcBarStyle(tab) {
      let currBarOffset = 0;
      for (let i = 0; i < tab.index; i += 1) {
        currBarOffset += this.allTabsWidth[i];
      }

      const currTabWidth = this.$refs[tab.label][0].clientWidth;

      this.tabWidth = {
        width: `${currTabWidth}px`,
        transform: `translate(${currBarOffset}px)`,
      };
    },
    saveTabsWidth() {
      this.tabsPane.forEach((ele) => {
        this.allTabsWidth.push(this.$refs[ele.label][0].clientWidth);
      });

      if (this.tabsPane.length) {
        this.calcBarStyle({
          index: 0,
          ...this.tabsPane[0],
        });
      }
    },
    setTabsPane() {
      this.tabsPane = this.$children
        .filter((ele) => ele.$options.name === 'ReTabPane')
        .map((ele) => {
          const { name, label } = ele.$attrs;

          return {
            name,
            label,
          };
        });

      this.$nextTick(() => {
        this.saveTabsWidth();
      });
    },
  },

  mounted() {
    this.setTabsPane();
  },
};
</script>

<style lang="scss" scoped>
.re-tabs {
  &__select {
    position: relative;
    border-bottom: 1px solid #ccc;

    &__list {
      &__item {
        display: inline-block;
        @include box-padding(10px);
        cursor: pointer;
        /* margin: 0 10px; */
      }
    }

    &__current-bar {
      position: absolute;
      left: 0px;
      bottom: -1px;
      height: 1px;
      background-color: $c-main;
      transition: 0.3s;
    }
  }

  &__content {
    margin-top: 10px;
  }
}
</style>
