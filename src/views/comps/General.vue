<template>
  <div class="view-general">
    <re-title :mt="false">按鈕</re-title>

    <re-row :mt="false">
      <re-button> 預設按鈕 </re-button>
      <re-button :disabled="true"> disabled按鈕 </re-button>
      <re-button type="border"> border按鈕 </re-button>
      <re-button type="plain"> plain按鈕 </re-button>
    </re-row>
    <re-row>
      <re-button><template #prefix>pre</template>按鈕</re-button>
      <re-button><template #prefix>pre</template>按鈕<template #suffix>suf</template></re-button>
      <re-button>預設按鈕<template #suffix>suf</template></re-button>
    </re-row>
    <re-row>
      <re-button>字很長很長很長很長的按鈕</re-button>
      <re-button size="small"> 小按鈕 </re-button>
    </re-row>
    <re-row>
      <re-button :isLoading="true">按紐</re-button>
      <re-button :isLoading="true" type="border"> border按鈕 </re-button>
      <re-button :isLoading="true" type="plain"> plain按鈕 </re-button>
      <re-button :isLoading="true" size="small"> 小按鈕 </re-button>
    </re-row>
  </div>
</template>

<script>
// import ReButton from '@/components/Button';

export default {
  name: 'General',
  components: {
    // ReButton,
  },
};
</script>

<style lang="scss">
.view-general {
  @include box-padding(10px);
}
</style>
