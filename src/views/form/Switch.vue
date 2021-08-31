<template>
  <div class="page-switch">
    <re-row :mt="false">
      <re-switch v-model="val.switch1" />
    </re-row>
    <re-row>
      <re-switch v-model="val.switch2" :switchLabel="{ on: '啟用', off: '關閉' }" :disabled="true" />
    </re-row>
  </div>
</template>

<script>
export default {
  name: 'PageSwitch',
  data() {
    return {
      val: {
        switch1: true,
        switch2: false,
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
