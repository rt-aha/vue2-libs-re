<template>
  <section>
    <CenterBox>
      <div class="login-content">
        此區域置中
      </div>
    </CenterBox>
  </section>
</template>

<script>
import CenterBox from '@/components/global/CenterBox.vue';

export default {
  name: 'Login',
  components: {
    CenterBox,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.login-content {
  background-color: $c-assist3;
}
</style>
