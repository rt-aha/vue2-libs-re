<template>
  <div class="dialog-template">
    <div>dialog 模板</div>
    <div style="width: 30px; height: 2000px; background-color: #ccc"></div>
    <div class="dialog-template__footer">
      <re-button @click="handleClose">取消</re-button>
    </div>

    <re-button @click="openDialog">二次彈窗按鈕</re-button>
    <re-dialog
      :visible.sync="secondDialog"
      title="二次彈窗"
      :appendToBody="true"
      >二次彈窗~
      <re-button @click="handleCloseSecondDialog">取消</re-button>
    </re-dialog>
  </div>
</template>

<script>
import SecondTemplate from '@/views/comps/SecondTemplate.vue';

export default {
  name: 'DialogTemplate',
  data() {
    return {
      secondDialog: false,
    };
  },
  methods: {
    openDialog() {
      this.secondDialog = true;
    },
    handleCloseSecondDialog() {
      this.secondDialog = false;
    },
    handleClose() {
      this.$emit('beforeClose');
      this.$emit('close');

      // this.$emit('greeting');
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-template {
  position: relative;

  &__footer {
    @include box-padding(10px);
  }
}
</style>
