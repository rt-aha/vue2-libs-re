<template>
  <div class="re-checkbox">
    <re-checkbox-option
      v-for="checkbox of options"
      :key="checkbox.value"
      v-bind="checkbox"
      @handleCheckbox="handleCheckbox"
      :inline="inline"
      :currValue="value"
    />
  </div>
</template>

<script>

import { cloneDeep } from 'lodash';

export default {
  name: 'ReCheckbox',
  inject: {
    reFormItem: {
      default: '',
    },
  },
  props: {
    value: {
      default: [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    inline: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleCheckbox(checkedValue) {
      let cloneValue = cloneDeep(this.value);
      const isChecked = this.value.includes(checkedValue);

      if (isChecked) {
        cloneValue = cloneValue.filter((val) => val !== checkedValue);
      } else {
        cloneValue.push(checkedValue);
      }

      this.$emit('input', cloneValue);
      if (this.reFormItem) {
        this.validateValue();
      }
    },
    validateValue() {
      this.$nextTick(() => {
        this.reFormItem.validateFormValue(this.value);
      });
    },
  },
};
</script>

<style lang="scss">

</style>
