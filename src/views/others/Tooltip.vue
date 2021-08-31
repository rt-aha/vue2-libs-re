<template>
  <div class="page-tooltip">
    <re-row>
      <re-tooltip position="top">
        <re-button>文字提示</re-button>
      </re-tooltip>
    </re-row>
    <re-row>
      <re-tooltip position="right">
        <re-button>文字提示</re-button>
      </re-tooltip>
    </re-row>

    <re-row>
      <re-tooltip position="left">
        <re-button>文字提示</re-button>
      </re-tooltip>
    </re-row>
    <re-row>
      <re-tooltip position="bottom">
        <re-button>文字提示</re-button>
      </re-tooltip>
    </re-row>
  </div>
</template>

<script>
export default {
  name: 'PageTooltip',
};
</script>

<style lang="scss" scoped></style>
