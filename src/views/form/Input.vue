<template>
  <div class="page-input">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-input v-model="val.input" placeholder="請輸入姓名" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>disabled 狀態</re-dev-desc>
      <re-input v-model="val.input" :disabled="true" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>可直接傳原生 input attrs, 例如 type="passord"</re-dev-desc>
      <re-input v-model="val.inputPw" type="password" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>放前綴與後綴</re-dev-desc>
      <re-input v-model="val.input">
        <template #prefix><icon-account :style="{ 'font-size': '24px' }" /></template>
        <template #suffix><icon-eye class="eye-icon" /></template>
      </re-input>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>加上前後固定的內容</re-dev-desc>
      <re-input v-model="val.input">
        <template #prepend>https://</template>
        <template #append>?key=tree</template>
      </re-input>
    </re-dev-sheet>
  </div>
</template>

<script>
import IconAccount from '@/assets/devIcon/Account.vue';
import IconEye from '@/assets/devIcon/Eye.vue';

export default {
  name: 'PageInput',
  components: {
    IconAccount,
    IconEye,
  },
  data() {
    return {
      val: {
        input: 'input-val',
        inputPw: 'input-val',
      },
    };
  },
};
</script>

<style scoped lang="scss">
.test {
  width: 10px;
  height: 2000px;
  background-color: #ccc;
}

// test
.eye-icon {
  font-size: 24px;
  cursor: pointer;
}
</style>
