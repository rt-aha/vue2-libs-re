<template>
  <div class="page-input-timer">
    <re-input-timer :api="sendMailAPI" timeLength="60" />
  </div>
</template>

<script>
import { sendMailAPI } from '@/api/test';

export default {
  name: 'PageInputTimer',
  data() {
    return {
      sendMailAPI,
    };
  },
};
</script>

<style lang="scss"></style>
