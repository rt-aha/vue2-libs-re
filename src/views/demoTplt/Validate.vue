<template>
  <div>
    <TpltInputWrapper class="" label="標籤" :infos="infos">
      <template slot-scope="scopeInfo">
        <span>{{ scopeInfo.infos.byebye }}</span>
      </template>

      <!-- <TpltInput></TpltInput> -->
    </TpltInputWrapper>
  </div>
</template>

<script>
// import TpltInput from '@/views/demoTplt/TpltInput.vue';
import TpltInputWrapper from '@/views/demoTplt/TpltInputWrapper.vue';

export default {
  name: 'Validate',
  components: {
    // TpltInput,
    TpltInputWrapper,
  },
  data() {
    return {
      infos: { haha: 'haha', byebye: 'byebye' },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>
