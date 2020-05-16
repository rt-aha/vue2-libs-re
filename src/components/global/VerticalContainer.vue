
<template>
  <section class="v-container-com">
    <div class="v-container-top"
         :style="topSlotFlexConfig"
         v-if="$slots['v-container-top']">
      <slot name="v-container-top"></slot>
    </div>
    <div class="v-container-center"
         :style="centerSlotFlexConfig"
         v-if="$slots['v-container-center']">
      <slot name="v-container-center"></slot>
    </div>
    <div class="v-container-bottom"
         :style="bottomSlotFlexConfig"
         v-if="$slots['v-container-bottom']">
      <slot name="v-container-bottom"></slot>
    </div>
  </section>
</template>

<script>


export default {
  // 這整個組件只是個容器，實際程式碼寫在父層的slot裡面
  name: 'VerticalContainer',
  props: {
    topSlotFlexConfig: {
      default: '',
    },
    centerSlotFlexConfig: {
      default: '',
    },
    bottomSlotFlexConfig: {
      default: '',
    }
  },


}
</script>

<style lang="scss" scoped>
.v-container-com {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .v-container-top,
  .v-container-center,
  .v-container-bottom {
    flex: 1;
  }
}
</style>