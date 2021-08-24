<template>
  <li
    class="re-select-option"
    :class="[
      {
        're-select-option--active': String(currOption) === String(value),
        're-select-option--label': $attrs.type === 'label',
        're-select-option--disabled': disabled,
      },
    ]"
    :data-option-value="value"
    :data-disabled-status="disabled"
    :data-label="$attrs.type === 'label'"
    :selected="String(currOption) === String(value)"
    @click.stop="handleOption(value, $attrs.type)"
  >
    <template v-if="$attrs.type === 'label'">
      <span class="re-select-option__item">{{ label }}</span>
    </template>
    <template v-else>
      <component v-if="render" :is="render()" v-bind="$attrs" />
      <span v-else class="re-select-option__item">{{ label }}</span>
    </template>
  </li>
</template>

<script>
export default {
  name: 'ReSelectOption',

  props: {
    value: {
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    render: {
      type: Function,
      // defualt: null,
    },
    currOption: {
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleOption(value, type) {
      // 點到標題時，沒有值
      if (type === 'label') return;
      this.$emit('handleOption', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.re-select-option {
  @include box-padding(10px);
  @include font-style($c-assist, 14px);
  display: inline-block;
  width: 100%;
  color: $c-assist;
  cursor: pointer;

  &:not([data-label='true']),
  &[data-disabled-status='true'] {
    &:hover {
      color: $c-main;
      background-color: rgba($c-main, 0.1);
    }
  }

  &--active {
    color: $c-main;
    background-color: rgba($c-main, 0.1);
  }

  &--label {
    @include font-style($c-text1, 12px);
    position: relative;
    background-color: transparent;
    cursor: default;

    &::after {
      @include position(tl, calc(100% - 1px), 50%);
      transform: translateX(-50%);
      content: '';
      display: inline-block;
      width: calc(100% - 20px);
      height: 1px;
      background-color: #ccc;
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
