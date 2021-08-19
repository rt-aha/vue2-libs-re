<template>
  <div class="re-layout-aside">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ReLayoutAside',
};
</script>

<style>
.re-layout-aside {
  height: 100%;
  border-right: 1px solid #ccc;
  overflow-y: auto;
}
</style>
