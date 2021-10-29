<template>
  <div
    class="ei-radio-option"
    :class="[
      {
        'ei-radio-option--inline': inline,
        'ei-radio-option--disabled': disabled,
      },
    ]"
  >
    <label class="ei-radio-box" :for="uuid">
      <div class="ei-radio-box__input">
        <input
          class="ei-radio-box__input__native"
          type="radio"
          :id="uuid"
          :disabled="disabled"
          @focus="focus = true"
          @blur="focus = false"
          @change="handleChange"
          :checked="isSelectedOption"
          :value="value"
        />
        <span class="ei-radio-box__input__actural" :class="isSelectedOption && 'ei-radio-box__input__actural--active'">
        </span>
      </div>
      <div class="ei-radio-box__content">
        <component v-if="render" :is="render()" v-bind="$attrs" v-on="$listeners" />
        <span v-else class="ei-radio-box__content__label">{{ label }}</span>
      </div>
    </label>
    <template v-if="isSelectedOption && renderContent">
      <component :is="renderContent()" v-bind="$attrs" v-on="$listeners" />
    </template>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
  name: 'EiRadioOption',
  props: {
    currValue: {
      default: '',
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
    inline: {
      type: Boolean,
      default: true,
    },
    render: {
      default: null,
    },
    renderContent: {
      default: null,
    },
  },
  data() {
    return {
      uuid: uuid(),
      focus: false,
    };
  },
  computed: {
    isSelectedOption() {
      return String(this.currValue) === String(this.value);
    },
  },
  methods: {
    handleChange() {
      if (this.disabled) return;

      this.$emit('handleRadio', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.ei-radio-option {
  height: auto;
  @include box-padding(10px 0);
  cursor: inherit;

  &--inline {
    display: inline-block;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .ei-radio-box {
      cursor: not-allowed;
    }
  }
}

.ei-radio-box {
  display: inline-flex;
  cursor: pointer;

  &__input {
    @include circle(20px);
    @include box-padding(2px);
    display: inline-block;
    flex: none;
    position: relative;
    vertical-align: middle;
    padding: 0;
    border: 2px solid $c-ei-grey3;

    &__native {
      display: none;
    }

    &__actural {
      @include position(center);
      @include circle(10px);
      display: inline-block;

      &--active {
        background-color: $c-blue;
      }
    }
  }

  &__content {
    flex: 1;
    margin-left: 12px;

    &__label {
      @include font-style($c-text1, 16px);
      line-height: 24px;
    }
  }
}
</style>
