<template>
  <div>
    {{ $route.name }}

    <CusItemWrapper label="輸入"
                    :ruleListWithMsg="['hasText']"
                    :extraInfo="{a: '1',b:2}"
                    :func="() => 'hi'">
      <CusEleInput v-model="form.input" />
    </CusItemWrapper>
    <CusItemWrapper label="下拉"
                    :ruleListWithMsg="['isSelect']"
                    :extraInfo="{a: '1',b:2}"
                    :func="() => 'hi'">
      <CusEleSelector :config="selectorConfig"
                      v-model="form.selector" />

    </CusItemWrapper>
    <CusItemWrapper label="開關"
                    :ruleListWithMsg="['hasText']"
                    :extraInfo="{a: '1',b:2}"
                    :func="() => 'hi'">
      <CusEleSwitch v-model="form.switch" />
    </CusItemWrapper>
    <CusItemWrapper label="日期"
                    :ruleListWithMsg="['hasText']"
                    :extraInfo="{a: '1',b:2}"
                    :func="() => 'hi'">
      <CusEleDatePicker :config="datePickerConfig"
                        v-model="form.date" />
    </CusItemWrapper>
    <CusItemWrapper label="日期"
                    :ruleListWithMsg="['hasText']"
                    :extraInfo="{a: '1',b:2}"
                    :func="() => 'hi'">
      <CusEleDateRangePicker :config="datePickerConfig"
                             v-model="form.dateRange" />
    </CusItemWrapper>

  </div>
</template>

<script>

import CusItemWrapper from '@/components/custom/CusItemWrapper';
import CusEleInput from '@/components/customElement/CusEleInput.vue';
import CusEleSelector from '@/components/customElement/CusEleSelector.vue';
import CusEleSwitch from '@/components/customElement/CusEleSwitch.vue';
import CusEleDatePicker from '@/components/customElement/CusEleDatePicker.vue';
import CusEleDateRangePicker from '@/components/customElement/CusEleDateRangePicker.vue';

import { setTime } from '@/utils/usefulHelper';

export default {
  name: 'DemoUI',
  components: {
    CusItemWrapper,
    CusEleInput,
    CusEleSelector,
    CusEleSwitch,
    CusEleDatePicker,
    CusEleDateRangePicker
  },
  data() {
    return {
      form: {
        input: '',
        selector: '',
        switch: '',
        date: '',
        dateRange: '',
      },
      selectorConfig: {
        key: 'age',
        type: 'selector',
        placeholder: 'age',
        defaultValue: 3,
        options: [
          {
            label: '1',
            value: 1,
          },
          {
            label: '2',
            value: 2,
          },
          {
            label: '3',
            value: 3,
          },
          {
            label: '4',
            value: 4,
          },
        ],
      },
      datePickerConfig: {
        key: 'dateRange',
        type: 'dateRangePicker',
        defaultValue: [setTime('month-subtract-1'), setTime('day-0-0')],
      },
    };
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>