<template>
  <div class="r-time-picker">
    <re-input
      :value="value"
      :style="{ width: '200px' }"
      placeholder="請選擇時間"
      readonly
      @click="openTimeList"
    />
    <re-expand-container :visible.sync="visible">
      <re-time-list :value="value" @input="handleInput" />
    </re-expand-container>
  </div>
</template>

<script>
export default {
  name: 'ReTimePicker',
  props: {
    value: {
      type: String,
      default: '00:00:00',
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

    closeTimeList() {
      this.visible = false;
    },
    openTimeList() {
      this.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.r-time-picker {
  position: relative;
}
.time-list-wrapper {
  @include position(tl, 0, 30px);
  z-index: 100;
}
</style>
