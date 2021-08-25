<template>
  <div class="page-input-number">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-input-number v-model="inputNumber1" placeholder="請輸入數字" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>定義階層</re-dev-desc>
      <re-input-number v-model="inputNumber2" step="2" :strictStep="true" :formatFn="twoDecimal" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>定義格式，test 保留兩位小數</re-dev-desc>
      <re-input-number v-model="inputNumber3" :formatFn="twoDecimal" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>小尺寸</re-dev-desc>
      <re-input-number v-model="inputNumber4" size="small" />
    </re-dev-sheet>
  </div>
</template>

<script>
export default {
  name: 'PageInputNumber',
  data() {
    return {
      inputNumber1: 2,
      inputNumber2: 17,
      inputNumber3: 123.32312321,
      inputNumber4: 0,
    };
  },
  methods: {
    twoDecimal(val) {
      return Number(val).toFixed(2);
    },
  },
};
</script>
