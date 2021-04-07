<template>
  <div class="re-search-filter">
    <re-row
      class="re-search-filter-box"
      v-for="item of innerValue"
      :key="item.prop"
    >
      <div
        class="re-search-filter-box__label"
        :style="{ width: `${labelConfig.width}px` }"
      >
        {{ item.label }}
      </div>
      <div class="re-search-filter-box__content">
      <component :is="`re-${item.type}`" v-model="item.value" v-bind="item" />
      </div>
    </re-row>
    <re-row>
      <re-button @click="setDefaultValue">預設</re-button>
      <re-button @click="handleSearch">搜尋</re-button>
    </re-row>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';

export default {
  name: 'ReSearchFilter',
  props: {
    searchConfig: {
      type: Array,
      default: () => [],
    },
    labelConfig: {
      type: Object,
      default: () => ({
        position: 'top',
        width: '100',
        textAlign: 'left',
      }),
    },
  },
  data() {
    return {
      defaultValue: [],
      innerValue: [],
    };
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.innerValue);
    },
    setInnerValue() {
      this.innerValue = cloneDeep(this.searchConfig);
    },
    saveDefaultValue() {
      this.defaultValue = cloneDeep(this.searchConfig);
    },
    setDefaultValue() {
      this.innerValue = cloneDeep(this.defaultValue);
    },
  },
  created() {
    this.setInnerValue();
    this.saveDefaultValue();
  },
};
</script>

<style lang="scss">
.re-search-filter {
  margin-bottom: 30px;
}
.re-search-filter-box {
  /* display: inline-block; */
  /* width: 200px; */

  &__label {
    @include font-style($c-assist, 14px);
  }

  &__content {
    flex: 1;
  }
}
</style>
