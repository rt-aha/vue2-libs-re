<template>
  <div class="re-easy-form">
    <re-form
      :rules="rules"
      :form="filterForm"
      ref="easyForm"
      :labelConfig="labelConfig"
    >
      <re-form-item :label="item.label" :prop="item.prop" v-for="item of innerform" :key="item.prop">
        <component :is="`re-${item.type}`" v-model="item.value" v-bind="item"/>
      </re-form-item>
      <re-button @click.prevent="submit">送出</re-button>
    </re-form>
  </div>
</template>

<script>

export default {
  name: 'ReEasyForm',
  props: {
    rules: {
      type: Object,
      default: () => ({}),
    },

    labelConfig: {
      type: Object,
      default: () => ({
        position: 'left', // top, left
        width: '80',
        textAlign: 'right', // left, right
      }),
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      innerform: [],

    };
  },
  computed: {
    filterForm() {
      return this.value.reduce((obj, item) => {
        obj[item.prop] = item.value;

        return obj;
      }, {});
    },
  },
  methods: {
    setInnerValue() {
      this.innerform = this.value;
    },
    submit() {
      this.$refs.easyForm.validateForm(() => {
        console.log('easyFrom congrats ~');
      });
    },
    syncValue() {
      console.log('this.innerform', this.innerform);
      this.$emit('input', this.innerform);
    },
  },

  created() {
    this.setInnerValue();
  },
  watch: {
    innerform: {
      handler: 'syncValue',
    },
  },

};
</script>

<style lang="scss">
</style>
