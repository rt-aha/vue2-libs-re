<template>
  <div class="ei-radio" :class="{ 'ei-radio--no-margin-top': noMarginTop }">
    <ei-radio-option
      v-for="radio of options"
      :key="radio.value"
      v-bind="radio"
      @handleRadio="handleRadio"
      :inline="inline"
      :currValue="value"
      :renderContent="radio.renderContent"
    />
  </div>
</template>

<script>
import EiRadioOption from '@/components/receiptMobile/EiRadio/RadioOption.vue';
export default {
  name: 'ReRadio',
  components: {
    EiRadioOption,
  },
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
    noMarginTop: {
      type: Boolean,
      default: true,
    },
    renderContent: {
      default: null,
    },
  },
  methods: {
    handleRadio(val) {
      this.$emit('input', val);
      this.$emit('change', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.ei-radio {
  margin-top: 12px;

  &--no-margin-top {
    margin-top: 0;
  }
}
</style>
