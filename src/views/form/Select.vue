<template>
  <div class="page-select">
    <re-dev-sheet>
      <re-dev-desc>基本使用，含一個自定義</re-dev-desc>
      <re-select v-model="select1" :options="selectOptions" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>全自定義</re-dev-desc>
      <re-select v-model="select2" :options="fruitOption" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>禁用選項</re-dev-desc>
      <re-select v-model="select3" :options="selectOptions" :disabled="true" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>選項分類</re-dev-desc>
      <re-select v-model="select4" :options="groupOptions" />
    </re-dev-sheet>
  </div>
</template>

<script>
import { selectOptions, fruitOption, groupOptions } from './config';

export default {
  name: 'PageSelect',
  data() {
    return {
      select1: 5,
      select2: 333,
      select3: 2,
      select4: 'Chengdu',
      selectOptions,
      fruitOption,
      groupOptions,
    };
  },
};
</script>
