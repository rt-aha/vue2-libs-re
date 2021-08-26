<template>
  <div class="page-email-auto-complete">
    <re-email-auto-complete v-model="emailValue" :options="domainList" />
  </div>
</template>

<script>
import { domainList } from './config';

export default {
  name: 'PageEmailAutoComplete',
  data() {
    return {
      emailValue: '',
      domainList,
    };
  },
};
</script>
