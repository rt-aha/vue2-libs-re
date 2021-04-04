export default {
  inject: {
    reFormItem: {
      default: '',
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
      if (this.reFormItem) {
        this.$nextTick(() => {
          // this.value 用於預設的model，但model可能被改過，所以可能需要用另外的值
          this.reFormItem.validateFormValue(this.value || value, event, options);
        });
      }
    },
  },
};
