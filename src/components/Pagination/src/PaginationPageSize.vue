<template>
  <div class="re-pagination-page-size">
    <re-select v-model="innerValue" :options="options" @change="handleChange">
      <template #suffix>筆/頁</template>
    </re-select>

  </div>
</template>

<script>
export default {
  name: 'RePaginationPageSize',
  props: {
    pageSize: {
      type: Array,
      default: () => [10, 20, 30],
    },
    value: {
      type: [String, Number],
      default: '10',
    },
  },
  data() {
    return {
      innerValue: '',
    };
  },
  computed: {
    options() {
      // console.log('this.pageSize', this.pageSize);
      const formatOptions = this.pageSize.map((ele) => {
        const obj = {
          label: String(ele),
          value: String(ele),
          render: () => ({
            name: 'PageSizeOption',
            render(h) {
              return h(
                're-row',
                {

                  props:
                  { justifyContent: 'space-between' },
                },
                [
                  h('span', ele),
                  h('span', '筆/頁'),
                ],
              );
            },
          }),
        };

        return obj;
      });

      return formatOptions;
    },
  },
  methods: {
    setInnerValue() {
      this.innerValue = this.value;
    },
    handleChange(val) {
      // console.log('val', val);
      const value = Number(val);
      console.log('value~~~', value);
      this.$emit('handlePageSize', value);
      this.$emit('handlePageInfo', {
        from: 'page-size',
        pageSize: value,
      });
    },
  },
  created() {
    this.setInnerValue();
  },
};
</script>

<style lang="scss">
.re-pagination-page-size {
  /* width: 50px; */

  /* .re-input {
    &__content {
      border: 0px transparent;
    }
  } */
}
</style>
