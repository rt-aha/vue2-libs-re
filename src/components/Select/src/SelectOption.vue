<template>
  <li
   class="re-select-option"
   :class="[{
       're-select-option--active':  String(currOption) === String(value),
       're-select-option--disabled': disabled
   }]"
    :data-option-value="value"
    :data-disabled-status="disabled"

    :selected="String(currOption) === String(value)"
  >
    <component v-if="render" :is="render"/>
    <span v-else class="re-select-option__item">{{ label }}</span>
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
      // type: Function,
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
};
</script>

<style lang="scss" scoped>

.re-select-option {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  color: $c-assist;
  @include font-style($c-assist, 14px);
  @include box-padding(10px 0);

  &:not([data-disabled-status="true"]) {
    &:hover {
      color: $c-main;
      @include font-style($c-main, 14px)
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--active {
    @include font-style($c-main, 14px)
  }
}
</style>
