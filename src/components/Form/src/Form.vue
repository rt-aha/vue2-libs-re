<template>
  <form class="re-form" :style="`width: ${width}`">
    <slot></slot>
  </form>
</template>

<script>
import Schema from 'async-validator';

export default {
  name: 'ReForm',
  compName: 'ReForm',
  props: {
    width: {
      type: String,
      default: 'auto',
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
    // TODO 要傳到下方item
    validateImmediately: {
      type: Boolean,
      default: true,
    },
    labelConfig: {
      type: Object,
      default: () => ({
        position: 'top',
        width: '100',
        textAlign: 'left',
      }),
    },

  },
  provide() {
    return {
      rForm: () => this,
      formErrMsg: () => this.formErrMsg,
      labelConfig: () => this.labelConfig,
    };
  },
  data() {
    return {
      formErrMsg: {},
      validateStatus: false,
    };
  },
  // created() {
  //   this.showModel();
  // },
  methods: {
    validatePass() {
      console.log('pass?');
      this.formErrMsg = {};
      this.validateStatus = true;
    },
    handleErrors(errorList) {
      console.log('not pass?');
      this.formErrMsg = errorList.reduce((obj, item) => {
        obj[item.field] = item.message;

        return obj;
      }, {});

      console.log('formErrMsg', this.formErrMsg);
      this.validateStatus = false;
    },
    validateForm() {
      const validator = new Schema(this.rules);
      validator.validate(this.form, (errors, fields) => {
        if (errors) {
          return this.handleErrors(errors, fields);
        }
        return this.validatePass();
      });

      return this.validateStatus;
    },
    handleForm() {
      this.validateForm();
      // if (this.validateImmediately) {

      // }
    },
  },
  watch: {
    form: {
      deep: true,
      handler: 'handleForm',
    },
  },
};
</script>
