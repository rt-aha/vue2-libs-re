<template>
  <div class="re-textarea">
    <textarea
      :style="cssStyle"
      class="re-textarea__native"
      :class="[
          {
            're-textarea__native--autosize--none': autosize === 'none',
            're-textarea__native--autosize--vertical': autosize === 'vertical',
            're-textarea__native--autosize--horizontal': autosize === 'horizontal',
            're-textarea__native--disabled': disabled,
          }
      ]"
      @input="handleInput"
      @change="handleChange"
      v-bind="$attrs"
      :rows="textAreaRows"
      ref="textarea"
    />
    <div class="count-limit" v-if="countLimit !== ''"
    :class="[
      {
        'count-limit--warning': isOverTextLimit,
      }
    ]">
      <span class="count-limit__curr-text-count">{{currTextCount}}</span>
      <span class="count-limit__slash">/</span>
      <span class="count-limit__limit-text">{{countLimit}}字</span>
    </div>
  </div>
</template>

<script>
import triggerValidate from '@/mixins/triggerValidate';
import { isNumber } from 'lodash';

export default {
  name: 'ReTextarea',
  mixins: [triggerValidate],
  props: {
    value: {
      type: String,
      default: '',
    },
    autosize: {
      type: [Boolean, String],
      default: '',
    },
    rows: {
      type: [String, Number],
      default: '3',
    },
    width: {
      type: [Number, String],
      default: 300,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    countLimit: {
      type: [String, Number],
      default: '',
      validator: (val) => isNumber(Number(val)),
    },
  },
  data() {
    return {
      currTextCount: 0,
    };
  },
  computed: {
    isOverTextLimit() {
      return Number(this.currTextCount) > Number(this.countLimit);
    },
    textAreaRows() {
      return String(this.rows);
    },
    resizeValue() {
      if (typeof this.autosize === 'boolean' && this.autosize) return true;
      return this.autosize;
    },
    cssStyle() {
      return {
        width: `${this.width}px`,
      };
    },
  },
  methods: {
    handleInput(e) {
      console.log('input', e.target.value);
      this.$emit('input', e.target.value);
      this.triggerValidate('input', e.target.value);
      this.currTextCount = e.target.value.length;
    },
    handleChange(e) {
      console.log('change', e.target.value);
      this.$emit('change', e.target.value);
      this.triggerValidate('change', e.target.value);
      this.currTextCount = e.target.value.length;
    },
    getTextarea() {
      return this.$refs.textarea;
    },
  },

};
</script>

<style lang="scss">
.re-textarea {
  position: relative;
  display: inline-block;

  &__native {
    border: 1px solid $c-main;
    border-radius: 4px;
    @include box-padding(10px);
    width: 200px;
    outline: 0px transparent;
    background-color: transparent;

    &--disabled {
      @include disabled;
    }

    &--autosize {
      &--none {
        resize: none;
      }

      &--vertical {
        resize: vertical;
      }

      &--horizontal {
        resize: horizontal;
      }
    }

  }

}

.count-limit {
  @include position(br, 10px ,10px);
  @include font-style($c-assist, 14px);

  &--warning {
    color: $c-error-message

  }

  &__curr-text-count {

  }

  &__slash {

  }

  &__limit-text {

  }
}
</style>
