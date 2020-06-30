<template>
  <div>
    <cus-form ref="form">
      <cus-item-wrapper
        label="帳號"
        :ruleListWithMsg="['hasText']"
      >
        <cus-input
          v-model="form.acc"
          :inputConfig="inputConfig.acc"
        />
      </cus-item-wrapper>
      <cus-item-wrapper
        label="密碼"
        :ruleListWithMsg="['hasText']"
      >
        <cus-input
          v-model="form.pwd"
          :inputConfig="inputConfig.pwd"
          type="password"
        />
      </cus-item-wrapper>
      <cus-item-wrapper>
        <button
          class="submit-btn"
          @click="onSubmit"
        >submit</button>
      </cus-item-wrapper>
    </cus-form>
  </div>
</template>

<script>
import CusForm from '@/components/customElement/CusForm.vue';
import CusItemWrapper from '@/components/customElement/CusItemWrapper.vue';
import CusInput from '@/components/customElement/CusInput.vue';



export default {
  name: 'Demo2',
  components: {
    CusForm,
    CusItemWrapper,
    CusInput,
  },
  data() {
    return {
      form: {
        acc: '',
        pwd: '',
        radio: null,
      },
      inputConfig: {
        acc: {
          key: 'name',
          placeholder: '請填寫帳號',
        },
        pwd: {
          key: 'pwd',
          placeholder: '請填寫密碼',
        },
      },
    };
  },
  methods: {
    onSubmit() {
      const form = this.$refs.form;
      const isPass = this.validateForm(form);
    },
  },

}
</script>

<style lang="scss" scoped>
</style>