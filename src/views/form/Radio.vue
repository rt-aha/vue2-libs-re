<template>
  <div class="page-radio">
    <re-dev-sheet>
      <re-dev-desc>直的排列，含一個自定義組件</re-dev-desc>
      <re-radio v-model="radio1" :options="radioOptions" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>橫的排列，含一個自定義組件</re-dev-desc>
      <re-radio v-model="radio2" :options="radioOptions" :inline="false" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>全自定義組件</re-dev-desc>
      <re-radio v-model="radio2" :options="phoneOptions" />
    </re-dev-sheet>
  </div>
</template>

<script>
import { radioOptions, phoneOptions } from './config';

export default {
  name: 'PageRadio',
  data() {
    return {
      radio1: 2,
      radio2: 3,
      radioOptions,
      phoneOptions,
    };
  },
};
</script>
