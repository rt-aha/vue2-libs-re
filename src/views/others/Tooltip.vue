<template>
  <div class="page-tooltip">
    <re-dev-sheet>
      <re-dev-desc>文字提示，上方</re-dev-desc>
      <re-tooltip position="top">
        <re-button>文字提示</re-button>
      </re-tooltip>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>文字提示，右方</re-dev-desc>
      <re-tooltip position="right">
        <re-button>文字提示</re-button>
      </re-tooltip>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>文字提示，左方</re-dev-desc>
      <re-tooltip position="left">
        <re-button>文字提示</re-button>
      </re-tooltip>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>文字提示，下方</re-dev-desc>
      <re-tooltip position="bottom">
        <re-button>文字提示</re-button>
      </re-tooltip>
    </re-dev-sheet>

    <re-dev-sheet :style="{ 'margin-top': '100px' }">
      <re-dev-desc>文字提示，自定義組件</re-dev-desc>
      <re-tooltip position="bottom" :render="CusTooltipContent">
        <re-button>按鈕</re-button>
      </re-tooltip>
    </re-dev-sheet>

    <CusTooltipContent />
  </div>
</template>

<script>
import CusTooltipContent from '@/devComponents/Tooltip/CusTooltipContent.vue';

export default {
  name: 'PageTooltip',
  components: {
    CusTooltipContent,
  },
  data() {
    return {
      CusTooltipContent,
    };
  },
};
</script>

<style lang="scss" scoped>
.page-tooltip {
  @include box-padding(100px);
}
</style>
