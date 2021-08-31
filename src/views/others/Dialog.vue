<template>
  <div class="page-dialog">
    <re-button @click="openDialog('prop')">開啟彈窗(prop)</re-button>
    <re-button @click="openDialog('slot')">開啟彈窗(slot)</re-button>

    <re-dialog
      :visible.sync="dialogVisible.prop"
      footerPosition="center"
      title="彈窗標題 prop"
      @beforeClose="beforeClose"
      :template="DialogTemplate"
      :data="{ a: 1, b: 2 }"
    />

    <re-dialog :visible.sync="dialogVisible.slot" footerPosition="center">
      <template #header>
        <re-title type="dialog" :mt="false">彈窗標題 slot</re-title>
      </template>
      <template> body </template>
      <template #footer>
        <re-button @click="closeDialog('slot')">取消</re-button>
      </template>
    </re-dialog>
  </div>
</template>

<script>
import DialogTemplate from '@/devComponents/Dialog/DialogTemplate.vue';

export default {
  name: 'PageDialog',

  data() {
    return {
      DialogTemplate,
      dialogVisible: {
        slot: false,
        prop: false,
      },
    };
  },
  methods: {
    beforeClose() {
      this.dialogVisible.prop = false;
    },
    openDialog(type) {
      console.log('openDialog');
      this.dialogVisible[type] = true;
    },
    closeDialog(type) {
      console.log('closeDialog');
      this.dialogVisible[type] = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
