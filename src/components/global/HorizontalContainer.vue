
<template>
  <section class="horizontal-container-com"
           :class="{
    'margin-bottom': $attrs.mb,
    'margin-top': $attrs.mt
  }">
    <div class="cttb-left"
         :style="leftSlotFlexConfig"
         v-if="showLeftSlot">
      <slot name="tool-bar-left"></slot>
    </div>
    <div class="cttb-center"
         :style="centerSlotFlexConfig"
         v-if="showCenterSlot">
      <slot name="tool-bar-center"></slot>
    </div>
    <div class="cttb-right"
         :style="rightSlotFlexConfig"
         v-if="showRightSlot">
      <slot name="tool-bar-right"></slot>
    </div>
  </section>
</template>

<script>


export default {
  // 這整個組件只是個容器，實際程式碼寫在父層的slot裡面
  name: 'HorizontalContainer',
  props: {
    showLeftSlot: {
      type: boolean,
      default: false,
    },
    showCenterSlot: {
      type: boolean,
      default: false,
    },
    showRightSlot: {
      type: boolean,
      default: false,
    },
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
.margin-bottom {
  margin-bottom: 15px;
}

.margin-top {
  margin-top: 15px;
}

.horizontal-container-com {
  width: 100%;
  display: flex;
  align-items: center;
  .cttb-left {
    flex: 1;
    text-align: left;
  }

  .cttb-center {
    flex: 1;
    text-align: center;
  }

  .cttb-right {
    display: inline-flex;
    text-align: right;
  }
}
</style>