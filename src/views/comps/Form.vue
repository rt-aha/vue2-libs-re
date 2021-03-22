<template>
  <div class="view-comp-dev">
    <re-form :rules="rules">
      <re-form-item label="姓名" prop="name">
        <re-input v-model="form.name" />
      </re-form-item>
      <re-form-item label="啟用" prop="enable">
        <re-switch v-model="form.enable"  />
      </re-form-item>
      <re-form-item label="收入" prop="income">
        <re-select v-model="form.income" :options="selectOptions" />
      </re-form-item>
      <re-form-item label="職業" prop="occupation">
        <re-radio v-model="form.occupation" :options="radioOptions" />
      </re-form-item>
      <re-form-item label="興趣" prop="interest">
        <re-checkbox v-model="form.interest" :options="checkboxOptions" :inline="false" />
      </re-form-item>
    </re-form>
  </div>
</template>

<script>
import { selectOptions, radioOptions, checkboxOptions } from './test-config';

export default {
  name: 'RForm',
  data() {
    return {
      selectOptions,
      radioOptions,
      checkboxOptions,
      form: {
        name: '',
        enable: true,
        income: 3,
        occupation: 2,
        interest: [1],
      },
      rules: {
        name: (val) => val !== '',
      },
    };
  },

};
</script>

<style lang="scss">
.view-comp-dev {
  @include box-padding(10px)
}
</style>
