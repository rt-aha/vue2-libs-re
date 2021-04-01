<template>
  <div>
   Login

   <re-button @click="testLogin">登入測試</re-button>
  </div>
</template>

<script>

export default {
  name: 'Login',
  methods: {
    testLogin() {
      setTimeout(() => {
        this.$router.push({ name: 'dashboardHome' });
      }, 1000);
    },
  },
};
</script>
