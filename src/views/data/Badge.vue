<template>
  <div class="page-badge">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-badge>
        <re-button>按鈕</re-button>
      </re-badge>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>棕色</re-dev-desc>
      <re-badge colorType="brown" value="35">
        <re-button>按鈕</re-button>
      </re-badge>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>綠色</re-dev-desc>
      <re-badge colorType="green">
        <re-button>按鈕</re-button>
      </re-badge>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>紅色，較長的內容</re-dev-desc>
      <re-badge colorType="red" v-model="hundredTest">
        <re-button>按鈕</re-button>
      </re-badge>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>小紅點，按鈕</re-dev-desc>
      <re-badge colorType="red" dot>
        <re-button>按鈕</re-button>
      </re-badge>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>小紅點，文字</re-dev-desc>
      <re-badge colorType="red" dot> 通知 </re-badge>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>左邊</re-dev-desc>
      <re-badge colorType="brown" position="left"> 通知 </re-badge>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>右邊</re-dev-desc>
      <re-badge colorType="red" position="right"> 通知 </re-badge>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>左邊，小紅點</re-dev-desc>
      <re-badge colorType="red" position="right" dot> 通知 </re-badge>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>右邊，小綠點</re-dev-desc>
      <re-badge colorType="green" position="left" dot> 通知 </re-badge>
    </re-dev-sheet>
  </div>
</template>

<script>
export default {
  name: 'PageBadge',
  data() {
    return {
      hundredTest: '100+',
    };
  },
};
</script>
