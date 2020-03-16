<template>
  <div class="input-wrapper custom-input-same"
       :class="[{
          're-big-input': $attrs.big,
          're-normal-input': $attrs.normal,
          'vertical-layout': $attrs.verticalLayout
        }]">

    <label class="input-label">{{ $attrs.labelName }}</label>

    <el-switch v-model="innerValue"
               @input="$emit('input', innerValue);"
               active-color="#3CB371"
               inactive-color="#CD5C5C">
    </el-switch>

  </div>
</template>

<script>
export default {
  Name: 'CustomSwitch',
  props: {
    ruleList: {
      type: Array,
      default: [],
    },
    value: {
      type: String,
      defalut: ''
    },
    data() {
      return {
        innerValue: '',
        isPassValidate: '',
        errMsg: '',
      };
    },
    watch: {
      value() {
        this.innerValue = this.value;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.input-wrapper {
  height: 40px;
  background-color: $c-white;
  position: relative;
  border-radius: 4px;

  /deep/ .el-input {
    width: auto;
  }
}

// .mock-label {
//   position: absolute;
//   top: 50%;
//   left: 0px;
//   transform: translateY(-50%);
//   @include font-style($c-assist3, $login-ph, $fw-300);
//   transition: 0.5s;
// }

.input-label {
  // @include font-style($c-assist3, $login-ph, $fw-300);
  display: inline-block;
  width: 150px;
  line-height: 40px;
}

.hasText {
  top: -20px;
  left: 0px;
  transform: translateY(0%);
  @include font-style($c-main1, $fs-12, $fw-700);
}

.err-wrapper {
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;

  .err-icon {
    margin-right: 5px;
    @extend .align-v;
    width: 20px;
  }

  .err-text {
    @extend .align-v;
    @include font-style($c-warning, $fs-12, $fw-400);
  }
}

.re-big-input {
  @include font-style($c-assist4, $fs-14, $fw-400);

  width: 350px;

  /deep/ .el-input__inner {
    width: 350px;
    height: 50px;
    background-color: transparent;
    position: relative;
    z-index: 1;
  }
}

.re-normal-input {
  width: auto;

  /deep/ .el-input__inner {
    height: 40px;
    width: 240px;
    background-color: transparent;
    position: relative;
    z-index: 1;
  }
}

.vertical-layout {
  display: block;

  & + & {
    margin-top: 30px;
  }
}
</style>