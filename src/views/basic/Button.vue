<template>
  <div class="page-button">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-button> 預設按鈕 </re-button>
      <re-button :disabled="true"> disabled按鈕 </re-button>
      <re-button type="border"> border按鈕 </re-button>
      <re-button type="plain"> plain按鈕 </re-button>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>前綴、後綴</re-dev-desc>
      <re-button><template #prefix>pre</template>按鈕</re-button>
      <re-button>
        <template #prefix>pre</template>
        按鈕
        <template #suffix>suf</template>
      </re-button>
      <re-button>預設按鈕<template #suffix>suf</template></re-button>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>帶 loading</re-dev-desc>
      <re-button :isLoading="true">按紐</re-button>
      <re-button :isLoading="true" type="border"> border按鈕 </re-button>
      <re-button :isLoading="true" type="plain"> plain按鈕 </re-button>
      <re-button :isLoading="true" size="small"> 小按鈕 </re-button>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>小 size</re-dev-desc>
      <re-button size="small"> 小按鈕 </re-button>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>其他類型測試</re-dev-desc>
      <re-button>字很長很長很長很長的按鈕</re-button>
      <re-button extra="circle">circle</re-button>
      <re-button bgColor="#CD5C5C">按紐</re-button>
      <re-button :style="{ 'border-color': '#CD5C5C', color: '#CD5C5C' }" type="border">按紐</re-button>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>Button Group</re-dev-desc>

      <re-button-group>
        <re-button> 讀 </re-button>
        <re-button> 寫 </re-button>
        <re-button> 寫 </re-button>
        <re-button> 刪 </re-button>
      </re-button-group>
    </re-dev-sheet>
  </div>
</template>

<script>
export default {
  name: 'PageButton',
};
</script>

<style lang="scss"></style>
