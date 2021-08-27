<template>
  <div class="page-form-index">
    <div class="router-view-wrap">
      <router-view />
    </div>

    <div class="form-demo-wrap">
      <form-page :hasDivide="true" />
    </div>
  </div>
</template>

<script>
import FormPage from '@/views/widget/Form.vue';

export default {
  name: 'ReFormIndex',
  components: {
    FormPage,
  },
};
</script>

<style scoped lang="scss">
.page-form-index {
  @include flex(flex-start, flex-start);
  width: 100%;
  height: 100%;
}

.router-view-wrap {
  flex: none;
  width: auto;
  min-width: 420px;
}

.form-demo-wrap {
  margin-left: 30px;
  flex: 1;
  height: 100%;
}
</style>
