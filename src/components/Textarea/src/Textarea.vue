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
      v-bind="$attrs"
      :rows="textAreaRows"
      ref="textarea"
    />
  </div>
</template>

<script>
export default {
  name: 'ReTextarea',
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
  },
  computed: {
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
      const textareaValue = e.target.value;
      this.$emit('input', textareaValue);
    },
    getTextarea() {
      return this.$refs.textarea;
    },
  },

};
</script>

<style lang="scss">
.re-textarea {

  &__native {
    border: 1px solid $c-main;
    border-radius: 4px;
    @include box-padding(10px);
    width: 200px;
    outline: 0px transparent;

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
</style>
