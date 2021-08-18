<template>
  <div class="page-input">
    <re-input v-model="val.input1" placeholder="請輸入姓名" />
  </div>
</template>

<script>
export default {
  name: 'PageInput',
  data() {
    return {
      val: {
        input1: '',
      },
    };
  },
};
</script>

<style scoped>
.test {
  width: 10px;
  height: 2000px;
  background-color: #ccc;
}
</style>
