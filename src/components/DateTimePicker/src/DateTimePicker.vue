<template>
  <div class="re-date-time-picker">
    <re-input
      :value="value"
      readonly
      @click.stop="openCalendar"
      cus-type="dateTimePicker"
    />
    <re-expand-container :visible.sync="visible" maxWidth="200">
      <re-row justifyContent="flex-end">
        <div class="picker-switcher">
          <span
            class="picker-switcher__item"
            @click="showPicker('date')"
            size="small"
            type="plain"
            >日期</span
          >
          <span
            class="picker-switcher__item"
            @click="showPicker('time')"
            size="small"
            type="plain"
            >時間</span
          >
        </div>
      </re-row>
      <re-row>
        <re-calendar
          v-show="currPicker === 'date'"
          :value="value"
          @input="handleInput"
          :defaultDate="value"
        />
        <re-time-list
          v-show="currPicker === 'time'"
          :value="value"
          @input="handleInput"
        />
      </re-row>
    </re-expand-container>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
  name: 'ReDateTimePicker',
  directives: {
    onClickaway,
  },
  props: {
    value: {
      default: '',
    },
  },
  data() {
    return {
      visible: false,
      currPicker: 'date',
    };
  },
  methods: {
    showPicker(type) {
      this.currPicker = type;
    },
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

<style lang="scss">
.re-date-time-picker {
  position: ralative;
}

.picker-switcher {
  @include box-padding(0 10px);

  &__item {
    @include font-style($c-main, 14px);
    cursor: pointer;

    & + & {
      margin-left: 10px;
    }
  }
}
</style>
