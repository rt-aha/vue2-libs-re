<template>
  <div class="page-email-auto-complete">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-email-auto-complete v-model="emailValue" :options="domainList" storageKey="testKey" />
      <re-row>
        <re-button @click="storeUsedEmail">存入 local host</re-button>
      </re-row>
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
  methods: {
    storeUsedEmail() {
      const domain = this.emailValue.split('@')[1];
      if (!domain) return;

      const emailConfig = {
        label: domain,
        value: domain,
      };
      const storageOption = localStorage.getItem('testKey') || '';

      if (storageOption === '') {
        localStorage.setItem('testKey', JSON.stringify([emailConfig]));
      } else {
        const laborRewardEmailOption = JSON.parse(storageOption);

        const existEmailDomain = [...domainList, ...laborRewardEmailOption];

        const isInStorage = existEmailDomain.some((item) => item.value === emailConfig.value);

        if (!isInStorage) {
          const options = [emailConfig, ...laborRewardEmailOption];

          // 上限 100 筆，超過 100 筆不儲存
          if (options.length < 100) {
            localStorage.setItem('testKey', JSON.stringify(options));
          }
        }
      }
    },
  },
};
</script>
