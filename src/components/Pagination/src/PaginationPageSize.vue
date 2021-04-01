<template>
  <div>
    <re-select v-model="innerValue" :options="options" />
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
  },
  created() {
    this.setInnerValue();
  },
};
</script>

<style lang="scss" scoped>
</style>
