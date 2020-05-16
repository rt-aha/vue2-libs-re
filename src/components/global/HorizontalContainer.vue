
<template>
  <section class="h-container-com">
    <div class="h-container-left h-container-box"
         :style="leftSlotFlexConfig"
         v-if="$slots['h-container-left']">
      <slot name="h-container-left"></slot>
    </div>
    <div class="h-container-center h-container-box"
         :style="centerSlotFlexConfig"
         v-if="$slots['h-container-center']">
      <slot name="h-container-center"></slot>
    </div>
    <div class="h-container-right h-container-box"
         :style="rightSlotFlexConfig"
         v-if="$slots['h-container-right']">
      <slot name="h-container-right"></slot>
    </div>
  </section>
</template>

<script>


export default {
  // 這整個組件只是個容器，實際程式碼寫在父層的slot裡面
  name: 'HorizontalContainer',
  props: {
    leftSlotFlexConfig: {
      default: '',
    },
    centerSlotFlexConfig: {
      default: '',
    },
    rightSlotFlexConfig: {
      default: '',
    }
  }

}
</script>

<style lang="scss" scoped>
.h-container-com {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .h-container-box {
    // height: 100%;
  }

  .h-container-left {
    flex: 1;
    text-align: left;
  }
  .h-container-center {
    flex: 1;
    text-align: center;
  }
  .h-container-right {
    flex: 1;
    text-align: right;
  }
}
</style>