<template>
  <div>
    <!--
      1. 沒有ruleList就不會觸發驗證
      2. func和funcResult是成對的，會在blur觸發，沒有func就不觸發
     -->
    <TpltInputWrapper label="標籤1"
                      :ruleListWithMsg="['hasText-tplt']"
                      :extraInfo="{a: '1',b:2}"
                      :func="() => 'hi'"
                      @funcResult="funcResult">
      <TpltInput v-model="testValue"></TpltInput>
    </TpltInputWrapper>

    <TpltInputWrapper label="標籤2"
                      :ruleListWithMsg="['hasText','overStringLength:3']"
                      :extraInfo="{a: '1',b:2}"
                      :func="() => 'hi'"
                      @funcResult="funcResult">
      <TpltInput v-model="testValue"></TpltInput>
    </TpltInputWrapper>
  </div>
</template>

<script>
import TpltInput from '@/views/demoTplt/TpltInput.vue';
import TpltInputWrapper from '@/views/demoTplt/TpltInputWrapper.vue';

export default {
  name: 'Validate',
  components: {
    TpltInput,
    TpltInputWrapper,
  },
  data() {
    return {
      infos: { haha: 'haha', byebye: 'byebye' },
      testValue: ''
    };
  },
  methods: {
    funcResult(res) {
      console.log('res', res);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>
