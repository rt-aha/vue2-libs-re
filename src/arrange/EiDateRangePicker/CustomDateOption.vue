<template>
  <div class="comp-custom-date-option">
    <div class="btn-wrap">
      <button class="date-option-btn" :class="{ 'date-option-btn--active': value === 1 }" @click="handleOption(1)">
        自訂日期
      </button>
      <button
        class="date-option-btn date-option-btn--no-lr-border"
        :class="{ 'date-option-btn--active': value === 7 }"
        @click="handleOption(7)"
      >
        最近 7 天
      </button>
      <button class="date-option-btn" :class="{ 'date-option-btn--active': value === 30 }" @click="handleOption(30)">
        最近 30 天
      </button>
    </div>

    <div class="date-value-wrap" :class="{ 'date-value-wrap--custom-picker': value === 1 }">
      <div class="date-value" @click="switchClickType('start')">
        <label class="date-value__label">開始日期</label>
        <input
          class="date-value__field"
          :class="{ 'date-value__field--active': clickType === 'start' }"
          v-model="startDate"
          readonly
        />
      </div>
      <div class="date-value" @click="switchClickType('end')">
        <label class="date-value__label">結束日期</label>
        <input
          class="date-value__field"
          :class="{ 'date-value__field--active': clickType === 'end' }"
          v-model="endDate"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomDateOption',
  props: {
    value: {
      type: Number,
      default: 1,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    clickType: {
      type: String,
    },
  },
  methods: {
    handleOption(val) {
      this.$emit('input', val);
      this.$emit('change', val);
    },
    switchClickType(clickType) {
      this.$emit('switchClickType', clickType);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-wrap {
  display: flex;
}

.date-option-btn {
  flex: 1;
  @include flex(center);
  @include font-style($c-blue, 12px);
  @include box-padding(8px 0);
  border: 1px solid $c-blue;
  background-color: $c-white;
  line-height: 18px;

  &--active {
    background-color: $c-blue;
    color: $c-white;
  }

  &--no-lr-border {
    border-left: 0px;
    border-right: 0px;
  }
}

.date-value-wrap {
  @include flex();
  @include box-padding(16px);
  margin-top: 16px;
  margin-bottom: 20px;

  &--custom-picker {
    background-color: rgba(235, 235, 225, 0.4);
  }
}

.date-value {
  flex: none;
  width: 120px;

  & + & {
    margin-left: 50px;
  }

  &__label {
    @include font-style($c-blue, 12px);
    line-height: 18px;
  }

  &__field {
    width: 120px;
    @include font-style($c-ei-text1, 16px);
    line-height: 24px;
    border-bottom: 1px solid $c-ei-grey3;

    &--active {
      color: $c-blue;
    }
  }
}
</style>
