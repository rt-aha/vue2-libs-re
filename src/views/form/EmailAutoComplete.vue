<template>
  <div class="page-email-auto-complete">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-email-auto-complete v-model="emailValue" :options="domainList" />
    </re-dev-sheet>
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
