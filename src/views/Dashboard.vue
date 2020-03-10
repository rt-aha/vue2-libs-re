<template>
  <div class="home">
    <h1>home tplt</h1>
    <Tplt msg="Welcome to Your Vue.js App" />
    <p>i18n: {{ $t('tplt.lang') }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Tplt from '@/components/Tplt.vue';
import { handleTpltAPI } from '@/services/tpltService';
import { handleTpltMockAPI } from '@/services/tpltService';


export default {
  name: 'Dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  components: {
    Tplt,
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
