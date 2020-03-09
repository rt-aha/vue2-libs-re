
<template>
  <section class="vertical-container-com"
           :class="{
    'margin-bottom': $attrs.mb,
    'margin-top': $attrs.mt
  }">
    <div class="cttb-top"
         :style="topSlotFlexConfig"
         v-if="showTopSlot">
      <slot name="tool-bar-left"></slot>
    </div>
    <div class="cttb-center"
         :style="centerSlotFlexConfig"
         v-if="showCenterSlot">
      <slot name="tool-bar-center"></slot>
    </div>
    <div class="cttb-bottom"
         :style="bottomSlotFlexConfig"
         v-if="showBottomtSlot">
      <slot name="tool-bar-right"></slot>
    </div>
  </section>
</template>

<script>


export default {
  // 這整個組件只是個容器，實際程式碼寫在父層的slot裡面
  name: 'VerticalContainer',
  props: {
    showTopSlot: {
      type: boolean,
      default: false,
    },
    showCenterSlot: {
      type: boolean,
      default: false,
    },
    showBottomSlot: {
      type: boolean,
      default: false,
    },
    topSlotFlexConfig: {
      default: '',
    },
    centerSlotFlexConfig: {
      default: '',
    },
    bottomSlotFlexConfig: {
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

.vertical-container-com {
  width: 100%;
  display: flex;
  align-items: center;
  .cttb-top {
    flex: 1;
    text-align: left;
  }

  .cttb-center {
    flex: 1;
    text-align: center;
  }

  .cttb-bottom {
    // inline-flex: 1;

    display: inline-flex;
  }
}
</style>