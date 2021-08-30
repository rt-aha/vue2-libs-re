<template>
  <div class="page-tag">
    <re-tags>標籤</re-tags>
    <re-row>
      <re-tags size="small">標籤</re-tags>
      <re-tags size="large">標籤</re-tags>
    </re-row>
    <re-row>
      <re-tags type="fill">標籤</re-tags>
      <re-tags type="plain">標籤</re-tags>
      <re-tags type="border">標籤</re-tags>
    </re-row>
    <re-row>
      <re-tags round="none">標籤</re-tags>
      <re-tags round="round">標籤</re-tags>
    </re-row>
    <re-row>
      <re-tags
        :style="{
          border: '1px solid #CD5C5C',
          'background-color': '#CD5C5C',
          color: '#ffffff',
        }"
        >標籤</re-tags
      >
    </re-row>
  </div>
</template>

<script>
export default {
  name: 'PageTag',
};
</script>

<style lang="scss"></style>
