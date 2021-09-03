<template>
  <div class="re-auto-input">
    <div class="input-field-box" :class="[`input-field-box--size--${size}`]" v-for="n of innerValue" :key="n.refIndex">
      <input
        class="input-field-box__field"
        :class="[`input-field-box__field--size--${size}`]"
        v-model="n.value"
        inputmode="numeric"
        min="0"
        max="9"
        maxlength="1"
        :ref="n.refIndex"
        @input="handleInput"
        @keydown="(e) => handleKeydown(e, n.refIndex)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReAutoInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    count: {
      type: [String, Number],
      default: 6,
    },
    size: {
      type: String,
      default: 'default',
      validator: (val) => ['small', 'default', 'large'].includes(val),
    },
  },
  data() {
    return {
      innerValue: [],
    };
  },
  methods: {
    // 刪除時作用
    handleKeydown(e, refIndex) {
      if (e.keyCode === 8) {
        const prevIndex = Number(refIndex.substr(1)) - 1;
        const prevRefIndex = `n${prevIndex}`;
        const emptyInput = this.innerValue.find((item) => item.value === '');

        // 表示現在全部輸入框都有數字，刪除現有輸入框數字
        if (!emptyInput) {
          this.innerValue = this.innerValue.map((item, index) => {
            if (item.refIndex === refIndex) {
              item.value = '';
            }

            return item;
          });
        } else {
          // 刪除前一個輸入框數字，並移動關注點到前一個
          this.innerValue = this.innerValue.map((item, index) => {
            if (item.refIndex === prevRefIndex) {
              item.value = '';
            }

            return item;
          });

          this.$nextTick(() => {
            if (prevIndex !== 0) {
              this.$refs[prevRefIndex][0].focus();
            }
          });
        }

        this.handleChange();
      }
    },
    handleInput() {
      this.handleChange();

      const nextInput = this.innerValue.find((item) => item.value === '');
      if (!nextInput) return;

      this.$nextTick(() => {
        this.$refs[nextInput.refIndex][0].focus();
      });
    },
    handleChange() {
      const value = this.innerValue.map((item) => item.value).join('');
      this.$emit('change', value);
    },
    setValue() {
      const val = [];

      for (let i = 0; i < Number(this.count); i += 1) {
        val.push('');
      }

      this.innerValue = val.map((n, index) => ({
        value: '',
        refIndex: `n${index + 1}`,
      }));

      this.$nextTick(() => {
        this.$refs.n1[0].focus();
      });
    },
  },
  mounted() {},
  created() {
    this.setValue();
  },
};
</script>

<style lang="scss" scoped>
.input-field-box {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  width: 60px;
  height: 60px;
  border: 2px solid $c-main;
  border-radius: 3px;

  & + & {
    margin-left: 10px;
  }

  &--size {
    &--small {
      width: 30px;
      height: 30px;
      border: 1px solid $c-main;
    }

    &--large {
      width: 80px;
      height: 80px;
      border: 3px solid $c-main;
    }
  }

  &__field {
    @include font-style($c-text1, 28px);
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 0 transparent;
    text-align: center;
    outline: 0 transparent;

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &--size {
      &--small {
        width: 20px;
        height: 20px;
        font-size: 16px;
      }

      &--large {
        width: 60px;
        height: 60px;
        font-size: 40px;
      }
    }
  }
}
</style>
