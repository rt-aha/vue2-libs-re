<template>
  <el-dialog :title="$attrs.title"
             :visible.sync="dialogSwitch"
             @close="closeDialog">
    <FreeContainer :padding="'0 0 60 0'">
      <slot> </slot>
    </FreeContainer>

    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 class="re-normal-btn"
                 @click="handleEvent">{{ $attrs.btnName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SubTitle from '@/components/global/SubTitle.vue';
import FreeContainer from '@/components/global/FreeContainer.vue';

export default {
  name: 'CustomDialog',
  components: {
    SubTitle,
    FreeContainer,
  },
  props: {
    type: boolean,
    default: false
  },
  data() {
    return {
      dialogSwitch: false
    };
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog', this.$attrs.type);
    },
    handleEvent() {
      this.$emit('handleEvent', this.$attrs.type);
    }
  },
  watch: {
    propDialogSwitch() {
      this.dialogSwitch = this.propDialogSwitch;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

/deep/ .row-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .custom-input-same {
    &:nth-child(3n + 2) {
      margin-left: 16px;
    }

    &:nth-child(3n + 3) {
      margin-left: 16px;
    }

    // 多排顯示
    margin-top: 32px;

    &:first-child {
      margin-top: 0px;
    }

    &:nth-child(2) {
      margin-top: 0px;
    }

    &:nth-child(3) {
      margin-top: 0px;
    }
  }
}
</style>
