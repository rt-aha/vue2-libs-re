<template>
  <div class="home">
    <h1>home tplt</h1>
    <Tplt msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Tplt from '@/components/Tplt.vue';
import { handleTpltAPI } from '@/services/tpltService';

export default {
  name: 'Home',
  components: {
    Tplt
  },
  created() {

    this.testAjax();
  },
  methods: {
    async testAjax() {
      const res = await handleTpltAPI();
      console.log('res', res);
    }
  }
};
</script>
