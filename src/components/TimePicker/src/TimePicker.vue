<template>
  <div class="r-time-picker">
    <re-input
      :value="timeString"
      :style="{ width: '200px' }"
      placeholder="請選擇時間"
      readonly
      @click="openTimeList"
    />
    <re-expand-container :visible.sync="visible">
      <re-time-list :value="innerValue" @input="handleInput" ref="timelist"/>
    </re-expand-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'ReTimePicker',
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      innerValue: new Date(),
      timeString: '',
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
      this.$refs.timelist.splitTime();
    },
    setInnerValue() {
      this.innerValue = this.value;
    },
    setTimeString() {
      this.timeString = dayjs(this.innerValue).format('HH:mm:ss');
    },
  },
  created() {
    this.setInnerValue();
    this.setTimeString();
  },
  watch: {
    value: {
      handler() {
        this.setInnerValue();
        this.setTimeString();
      },
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
