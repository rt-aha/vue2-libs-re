<template>
  <div class="cus-input">
    <input v-model="innerValue"
           @input="$emit('input',innerValue)"
           @blur="handleValidate"
           :placeholder="inputConfig.placeholder"
           :type="pwdType" />
    <img class="eye eye-show"
         src="@/assets/custom/ico-eye-open.svg"
         v-if="pwdType === 'password'"
         @click="switchType" />
    <img class="eye eye-hide"
         src="@/assets/custom/ico-eye-close.svg"
         v-else
         @click="switchType" />
    <p class="err-msg"></p>
  </div>
</template>

<script>
export default {
  name: 'CusPwdInput',
  inject: ['errMsgText'],
  data() {
    return {
      default: {
        data: ''
      },
      innerValue: '',
      pwdType: 'password',
      type: 'input'
    };
  },
  props: {
    value: String,
    inputConfig: {
      type: Object,
      default() {
        return {
          defaultValue: '123',
          placeholder: '請輸入'
        };
      }
    },
    width: {
      default: '300px'
    },
    radius: {
      default: 'none'
    },

  },
  computed: {
    wrapperStyle() {
      return {
        maxWidth: this.width
      };
    },
    inputStyle() {
      return {
        borderRadius: this.radius
      };
    },
    errMsg() {
      return this.errMsgText();
    }
  },
  methods: {
    handleValidate() {
      // 觸發驗證，把現在的值與實例透過mixin傳給wrapper處理
      const result = this.dispatchEvent(this.$parent, 'handleValidate', this.innerValue);
    },
    onShowPwd() {
      this.pwdType = 'text';
    },
    onHidePwd() {
      this.pwdType = 'password';
    },
    switchType() {
      if (this.pwdType === 'password') {
        this.pwdType = 'text';
      } else {
        this.pwdType = 'password';
      }
    },
    setValue() {
      this.innerValue = this.value;
    }
  },
  created() {
    this.innerValue = this.inputConfig.defaultValue;
    this.$on('handleValidate', this.handleValidate);
  },
  watch: {
    value: {
      handler: 'setValue'
    }
  }
};
</script>

<style lang="scss" scoped>
.cus-input {
  width: 100%;
  position: relative;

  & + & {
    margin-top: 20px;
  }
}

.input {
  width: 100%;
  height: 40px;
  border: 1px solid #e5e5e5;
  @include box-padding(10px 15px);
  border-radius: 4px;

  &::placeholder {
    color: #e5e5e5;
  }
}

.eye {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
}

.err-status {
  border: 1px solid $c-error;
}

/deep/ .el-input__inner {
  &::placeholder {
    font-size: 14px;
  }
}
</style>
