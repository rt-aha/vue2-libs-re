<template>
  <div class="err-stataus-wrapper">
    <!-- <img class="status status-ok"
         src="@/assets/custom/ico-checked.svg"
         v-show="errStatus === 'ok'" />
    <img class="status status-error"
         src="@/assets/custom/ico-checked-error.svg"
         v-show="errStatus === 'error'" /> -->

    <p class="status status-ok"
       v-show="errStatus === 'ok'">v</p>
    <p class="status status-error"
       v-show="errStatus === 'error'">x</p>
  </div>
</template>

<script>
export default {
  name: 'ErrStatus',
  props: {
    errStatus: {
      type: String,
      default: 'ok'
    }
  }
};
</script>

<style lang="scss" scoped>
.err-text-wrapper {
  height: 20px;
}

.err-stataus-wrapper {
  position: absolute;
  top: 8px;
  right: -30px;
}
</style>
