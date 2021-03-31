<template>
  <div class="re-checkbox" :class="[
      {
        're-checkbox--inline': inline,
        're-checkbox--disabled': disabled,
      },
    ]">
    <label class="re-checkbox-box" :for="label" @click.stop="handler">
      <div class="re-checkbox-box__input">
        <input class="re-checkbox-box__input__origin" type="checkbox" :id="uuid" />
        <span
          class="re-checkbox-box__input__actural"
          :class="[
            {'re-checkbox-box__input__actural--active': currValue.includes(value) || checkAll}
          ]"
        ></span>
      </div>
      <span class="re-checkbox-box__label">{{ label }}</span>
    </label>
  </div>

</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
  name: 'ReCheckbox',
  model: {
    prop: 'checkAll',
    event: 'checkAll',
  },
  props: {
    checkAll: {
      type: Boolean,
      default: false,
    },
    currValue: {
      type: Array,
      default: () => [],
    },
    value: {
      default: '',
    },
    label: {
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    render: {
      type: Object,
      default: () => ({}),
    },
    inline: {
      type: Boolean,
      default: true,
    },
    inGroup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uuid: uuid(),
      handler() {},
    };
  },
  methods: {
    handleCheckbox() {
      if (this.disabled) return;
      this.$emit('change', !this.checkAll);
    },

    handleCheckboxGroup() {
      if (this.disabled) return;
      this.$emit('handleCheckboxGroup', this.value);
    },
    setHandler() {
      if (this.inGroup) {
        this.handler = this.handleCheckboxGroup;
      } else {
        this.handler = this.handleCheckbox;
      }
    },
  },

  created() {
    this.setHandler();
  },
};
</script>

<style lang="scss">

.re-checkbox {
  margin: 5px 10px 5px 0;
  cursor: inherit;

  &--inline {
    display: inline-block;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;

    .re-radio-box {
      cursor: not-allowed;
    }
  }
}

.re-checkbox-box {
  display: inline-block;
  cursor: pointer;

  &__input {
    padding: 0;
    display: inline-block;
    vertical-align: middle;
    @include circle(16px, 4px);
    @include box-padding(2px);
    position: relative;
    border: 1px solid $c-assist;

    &__origin {
      display: none;
    }

    &__actural {
      display: inline-block;
      @include circle(10px, 2px);

        &--active {
          @include position(center);
          background-color: $c-main;
        }
    }
  }

  &__label {
    display: inline-block;
    vertical-align: middle;
    padding-left: 5px;
    @include font-style($c-assist, 14px);
  }
}
</style>
