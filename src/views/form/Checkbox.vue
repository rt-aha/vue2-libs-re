<template>
  <div class="page-checkbox">
    <re-dev-sheet>
      <re-dev-desc>單獨使用</re-dev-desc>
      <re-checkbox v-model="isAgree1" label="我同意協議書內容" />
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>單獨使用，自定義組件</re-dev-desc>
      <re-checkbox v-model="isAgree2" label="我同意協議書內容" :render="agreement" />
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>群組橫的排列，含一個自定義組件</re-dev-desc>
      <re-checkbox-group v-model="checkbox1" :options="checkboxOptions" />
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>群組直的排列，含一個自定義組件</re-dev-desc>
      <re-checkbox-group v-model="checkbox2" :options="checkboxOptions" :inline="false" />
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>全自定義組件</re-dev-desc>
      <re-checkbox-group v-model="checkbox3" :options="meatOptions" :inline="false" />
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>搭配全選</re-dev-desc>
      <re-checkbox v-model="checkAll" label="全選" @change="setCheckAll" />
      <re-checkbox-group
        v-model="checkbox4"
        :options="checkboxOptions"
        :isCheckAll="checkAll"
        @change="handleCheckAll"
      />
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>限制可選擇數量，此處為至少 1 個，至多 3 個</re-dev-desc>
      <re-checkbox-group v-model="checkbox5" :options="limitedCheckboxOptions" :limit="[1, 3]" />
    </re-dev-sheet>
  </div>
</template>

<script>
import Agreement from '@/devComponents/Checkbox/Agreement.vue';
import { checkboxOptions, limitedCheckboxOptions, meatOptions } from './config';

export default {
  name: 'PageCheckbox',
  components: {
    // Agreement,
  },
  data() {
    return {
      isAgree1: true,
      isAgree2: false,
      checkbox1: [2],
      checkbox2: [1, 4, 5],
      checkAll: true,
      checkbox3: [],
      checkbox4: [],
      checkbox5: [4],
      checkboxOptions,
      limitedCheckboxOptions,
      meatOptions,
      agreement: () => Agreement,
    };
  },
  methods: {
    // 全選的 true 或 false 決定是否全選
    setCheckAll(val) {
      if (val) {
        this.checkbox4 = this.checkboxOptions.map((ele) => ele.value);
      } else {
        this.checkbox4 = [];
      }
    },
    // 是否全部選中，決定全選框的 true false
    handleCheckAll(val) {
      if (val.length === this.checkboxOptions.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
  },
  created() {
    this.setCheckAll(this.checkAll);
  },
};
</script>
