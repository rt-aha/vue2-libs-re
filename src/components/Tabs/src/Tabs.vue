<template>
  <div class="re-tabs">
    <div class="re-tabs__select">
      <ul class="re-tabs__select__list" ref="ul">
        <li
          class="re-tabs__select__list__item"
          :class="[
            {
              're-tabs__select__list__item--disabled': tab.disabled,
              're-tabs__select__list__item--active': value === tab.name,
            },
          ]"
          v-for="(tab, index) of tabsConfig"
          :key="tab.name"
          :ref="tab.name"
          :data-tab-name="tab.name"
          :data-tab-label="tab.label"
          @click="handleClick({ index, ...tab })"
        >
          <template v-if="tab.render">
            <component :is="tab.render" v-on="$listeners" />
          </template>
          <template v-else>
            <span>{{ tab.label }}</span>
          </template>
        </li>
      </ul>
    </div>
    <div class="re-tabs__content" v-for="content of tabsConfig" :key="content.name">
      <div v-show="content.name === value">
        <slot :name="content.name"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';

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
      slotsList: [],
    };
  },
  methods: {
    setSlotList() {
      this.slotsList = Object.keys(this.$slots);
    },
    handleClick(tab) {
      if (tab.disabled) return;
      this.$emit('change', tab);
    },
  },
};
</script>

<style lang="scss" scoped>
.re-tabs {
  position: relative;
  width: 100%;

  &__select {
    position: relative;
    width: 100%;

    &::before {
      @include position(tl, 0, 0);
      content: '';
      display: inline-block;
      z-index: 500;
      width: 10px;
      height: calc(100% - 1px);
      background: linear-gradient(90deg, $c-white 0%, transparent 90%, transparent 100%);
    }

    &::after {
      @include position(tr, 0, 0);
      content: '';
      display: inline-block;
      z-index: 500;
      width: 10px;
      height: calc(100% - 1px);
      background: linear-gradient(270deg, $c-white 0%, transparent 90%, transparent 100%);
    }

    &__list {
      position: relative;
      width: 100%;
      white-space: nowrap;
      overflow-x: auto;

      &::-webkit-scrollbar {
        height: 0;
      }

      &::after {
        @include position(tl, calc(100% - 1px), 0);
        content: '';
        display: inline-block;
        width: 100%;
        height: 1px;
        background: $c-lightgrey;
      }

      &__item {
        @include box-padding(10px);
        display: inline-block;
        position: relative;
        cursor: pointer;

        &::after {
          @include position(tl, calc(100% - 1px), 0);
          content: '';
          display: inline-block;
          width: 100%;
          height: 1px;
          background-color: $c-lightgrey;
        }

        &--active {
          position: relative;
          color: $c-main;

          &::after {
            display: inline-block;
            z-index: 300;
            background-color: $c-main;
          }
        }

        &--disabled {
          @include disabled;
          background-color: transparent;
        }
      }
    }

    /* &__current-bar {
      position: absolute;
      left: 0px;
      bottom: -1px;
      height: 1px;
      background-color: $c-main;
      transition: 0.3s;
    } */
  }

  &__content {
    margin-top: 10px;
  }
}
</style>
