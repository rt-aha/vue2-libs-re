<template>
  <div>
   Login
   <re-button @click="testLogin">登入測試</re-button>
  </div>
</template>

<script>
import writeDynamicRoutes from '@/mixins/writeDynamicRoutes';

export default {
  name: 'Login',
  mixins: [writeDynamicRoutes],
  methods: {
    testLogin() {
      // ...getTokenAPI();
      this.writeDynamicRoutes();
      this.$router.push({ name: 'dashboardHome' });
    },
  },
  created() {
  },
};
</script>
