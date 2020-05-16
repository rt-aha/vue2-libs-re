<template>
  <div class="home">
    <h1>home tplt</h1>
    <p>i18n: {{ $t('tplt.lang') }}</p>
    <SvgIcon />
  </div>
</template>

<script>
import { handleTpltAPI } from '@/services/tpltService';
import { handleTpltMockAPI } from '@/services/tpltService';
import SvgIcon from '@/assets/tplt/error.svg';

console.log(SvgIcon);


export default {
  name: 'Dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  components: {
    SvgIcon
  },
  created() {
    // this.testAjax();
    // this.mockAjax();
  },
  methods: {
    async testAjax() {
      const res = await handleTpltAPI();
      console.log('res', res);
    },
    async mockAjax() {
      const res = await handleTpltMockAPI();
      console.log('res', res);
    },
  },
};
</script>
