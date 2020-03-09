
<template>
  <section class="tool-bar-com"
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
import { Component, Vue, Prop } from 'vue-property-decorator';

export default class ToolBar extends Vue {
  // 這整個組件只是作為customtableToolbar的容器，實際程式碼寫在父層的slot裡面

  // 是否顯示左邊的slot
  // 父層 e.g. :showLeftSlot="true"
  @Prop({ default: () => false })
  public showLeftSlot: boolean;

  // 是否顯示中間的slot
  @Prop({ default: () => false })
  public showCenterSlot: boolean;

  // 是否顯示右邊的slot
  @Prop({ default: () => false })
  public showRightSlot: boolean;

  // 右邊slot的inline屬性，沒傳值就對分
  // 父層 e.g. :rightSlotFlexConfig="{flex: 'none', width:'80px'}"
  @Prop({ default: () => {} })
  public rightSlotFlexConfig: any;

  // 中間slot的inline屬性，沒傳值就對分
  @Prop({ default: () => {} })
  public centerSlotFlexConfig: any;

  // 左邊slot的inline屬性，沒傳值就對分
  @Prop({ default: () => {} })
  public leftSlotFlexConfig: any;
}
</script>

<style lang="scss" scoped>
.margin-bottom {
  margin-bottom: 15px;
}

.margin-top {
  margin-top: 15px;
}

.tool-bar-com {
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
    // inline-flex: 1;

    display: inline-flex;
    text-align: right;
  }
}
</style>