<template>
  <div class="re-tabs">
    <div class="re-tabs__select">
      <ul class="re-tabs__select__list" ref="ul">
        <li
          class="re-tabs__select__list__item"
          :class="[{ 're-tabs__select__list__item--disabled': tab.disabled }]"
          v-for="(tab, index) of tabsConfig"
          :key="tab.name"
          :ref="tab.name"
          :data-tab-name="tab.name"
          :data-tab-label="tab.label"
          @click.stop="handleClick({ index, ...tab })"
        >
          <template v-if="tab.render">
            <component :is="tab.render" />
          </template>
          <template v-else>
            <span>{{ tab.label }}</span>
          </template>
        </li>
      </ul>
      <div class="re-tabs__select__current-bar" :style="tabWidth"></div>
    </div>
    <div
      class="re-tabs__content"
      v-for="content of tabsConfig"
      :key="content.name"
    >
      <div v-show="content.name === value">
        <slot :name="content.name"></slot>
      </div>
    </div>
  </div>
</template>

<script>
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
      tabLabel: [],
      slotsList: [],
    };
  },
  methods: {
    setSlotList() {
      this.slotsList = Object.keys(this.$slots);
    },
    handleClick(tab) {
      if (tab.disabled) return;
      this.calcBarStyle(tab);
      this.$emit('change', tab);
    },
    calcBarStyle(tab) {
      console.log('tab', tab);
      let currBarOffset = 0;
      for (let i = 0; i < tab.index; i += 1) {
        currBarOffset += this.allTabsWidth[i];
      }

      const currTabWidth = this.$refs[tab.name][0].clientWidth;

      this.tabWidth = {
        width: `${currTabWidth}px`,
        transform: `translate(${currBarOffset}px)`,
      };
    },
    saveTabsWidth() {
      this.tabLabel.forEach((ele) => {
        this.allTabsWidth.push(this.$refs[ele.label][0].clientWidth);
      });

      if (this.tabLabel.length) {
        this.calcBarStyle({
          index: 0,
          ...this.tabLabel[0],
        });
      }
    },
    setTabsPane() {
      const list = this.$refs.ul.children;

      this.tabLabel = Array.from(list)
        .map((ele) => {
          const name = ele.getAttribute('data-tab-name');
          const label = ele.getAttribute('data-tab-label');
          const width = ele.clientWidth;

          return {
            name,
            label,
            // width,
          };
        });

      this.$nextTick(() => {
        this.saveTabsWidth();
      });
    },
  },

  mounted() {
    this.setTabsPane();
    // this.setSlotList();
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

        &--disabled {
          @include disabled;
          background-color: transparent;
        }
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
