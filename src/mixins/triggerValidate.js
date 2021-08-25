export default {
  inject: {
    reFormItem: {
      default: undefined,
    },
  },
  methods: {
    /**
     *
     * @param {string} event
     * @param {any} value 若model有重設，需另外傳入要驗證的值
     * @param {object} options 額外資訊
     */
    triggerValidate(event, value, options) {
      console.log('event', event);
      console.log('value', value);
      console.log('options', options);
      if (this.reFormItem) {
        this.$nextTick(() => {
          this.reFormItem.validateFormValue(value, event, options);
        });
      }
    },
  },
};
