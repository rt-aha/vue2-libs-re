<template>
  <div>
    <re-title class="mb-30">Template: vue2-webpack-js</re-title>

    <re-title>lib: network</re-title>
    <p>send request: {{ requestTestStatus }}</p>

    <re-title class="mt-10">lib: scss</re-title>
    <p class="scss">this text should <strong>not be black</strong></p>
  </div>
</template>

<script lang="ts">
import { getUsersAPI } from '@/api/test';

export default {
  name: 'CheckList',
  data() {
    return {
      requestTestStatus: '',
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const res = await getUsersAPI();

      if (Array.isArray(res) && res.length === 10) {
        this.requestTestStatus = 'success';
      } else {
        this.requestTestStatus = 'fail';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scss {
  color: $c-main;
}

.mb-30 {
  margin-bottom: 30px;
}

.mt-10 {
  margin-top: 10px;
}
</style>
