<template>
  <div class="login-view">
    <CenterBox>
      <div class="login-content">
        此區域置中
      </div>
      <button @click="toDashboard">
        登入
      </button>
    </CenterBox>
  </div>
</template>

<script>
import CenterBox from '@/components/global/CenterBox.vue';

export default {
  name: 'Login',
  components: {
    CenterBox,
  },
  methods: {
    toDashboard() {
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.login-content {
  background-color: $c-assist3;
}
</style>
