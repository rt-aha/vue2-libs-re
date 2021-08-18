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
  border-right: 1px solid #ccc;
}
</style>
