<template>
  <div class="view-login">
    <div class="login-box">
      <re-form :form="loginForm" :rules="loginFormRules" ref="loginForm">
        <re-form-item label="帳號" prop="account">
          <re-input v-model="loginForm.account"/>
        </re-form-item>

        <re-form-item label="密碼" prop="password">
          <re-input v-model="loginForm.password" type="password" />
        </re-form-item>

        <re-form-item>
          <re-row :mt="false" justifyContent="center">
            <re-button @click.prevent="submit">登入</re-button>
          </re-row>
        </re-form-item>
      </re-form>
    </div>
  </div>
</template>

<script>
import writeDynamicRoutes from '@/mixins/writeDynamicRoutes';
import { vld } from '@/utils/validate/vld';

export default {
  name: 'Login',
  mixins: [writeDynamicRoutes],
  data() {
    return {
      loginForm: {
        account: '',
        password: '',
      },
      loginFormRules: {
        account: {
          validator: (rule, value) => vld({
            value,
            ruleList: ['vldRequire', 'vldLengthMoreThen:8'],
          }),
          trigger: ['change'],
        },
        password: {
          validator: (rule, value) => vld({
            value,
            ruleList: ['vldRequire', 'vldLengthMoreThen:8'],
          }),
          trigger: ['change'],
        },
      },
    };
  },
  methods: {
    testLogin() {
      this.writeDynamicRoutes();
      this.$router.push({ name: 'dashboardHome' });
    },
    submit() {
      this.$refs.loginForm.validateForm(() => {
        this.$router.push({ name: 'dashboardHome' });
      });
    },
  },
  created() {},
};
</script>

<style lang="scss">
.view-login {
  width: 100%;
  height: 100%;
  @include flex(center);
}

.login-box {
  @include box-padding(15px 10px);
  width: 300px;
}
</style>
