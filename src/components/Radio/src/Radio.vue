<template>
  <div class="re-radio">
    <re-radio-option
      v-for="(radio) of options"
      :key="radio.value"
      v-bind="radio"
      @handleRadio="handleRadio"
      :inline="inline"
      :currValue="value"
    />
  </div>
</template>

<script>

export default {
  name: 'ReRadio',

  props: {
    value: {
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    inline: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleRadio(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style lang="scss">

</style>
