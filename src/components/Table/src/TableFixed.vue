<template>
  <div class="re-table-fixed">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ReTableFixed',
};
</script>

<style lang="scss">
.re-table-fixed {

  display: inline-block;
  @include position(tr, 0, 0px);
  height: 100%;
  box-sizing: border-box;
  background-color: $c-white;
  border-top: 1px solid $c-lightgrey;
  /* border-bottom: 1px solid $c-lightgrey; */
  /* border-left: 1px solid $c-lightgrey; */
  overflow-y: auto;
  height: 605px;
  box-shadow: -3px 0px 5px $c-lightgrey;
  /* position: relative;
  border-right: 1px solid $c-lightgrey; */
}
</style>
