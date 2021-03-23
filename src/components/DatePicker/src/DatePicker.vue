<template>
  <div class="re-date-picker">
    <re-input
      :value="value"
      readonly
      @click.stop="openCalendar"
      cus-type="datePicker"
    />
    <re-expand-container :visible.sync="visible">
      <re-calendar :value="value" @input="handleInput" :defaultDate="value" />
    </re-expand-container>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
  name: 'ReDatePicker',
  directives: {
    onClickaway,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
    },
    openCalendar() {
      this.visible = true;
    },
    closeCalendar() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
