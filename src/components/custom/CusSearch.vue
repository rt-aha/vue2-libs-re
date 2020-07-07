<template>
  <div class="custom-search">
    <div class="search-type-box" v-for="(config,index) of configList" :key="index">
      <cus-item-wrapper :label="config.title" v-if="config.type === 'input'">
        <cus-input v-model="config.value" :inputConfig="config" />
      </cus-item-wrapper>
      <cus-item-wrapper :label="config.title" v-if="config.type ==='switch'">
        <cus-switch v-model="config.value" :inputConfig="config" />
      </cus-item-wrapper>
      <cus-item-wrapper :label="config.title" v-if="config.type === 'selector'">
        <cus-selector v-model="config.value" :inputConfig="config" />
      </cus-item-wrapper>
      <cus-item-wrapper :label="config.title" v-if="config.type === 'datePicker'">
        <cus-date-picker v-model="config.value" :inputConfig="config" />
      </cus-item-wrapper>
      <cus-item-wrapper :label="config.title" v-if="config.type === 'dateRangePicker'">
        <cus-date-range-picker v-model="config.value" :inputConfig="config" />
      </cus-item-wrapper>
    </div>

    <!-- <i class="el-icon-search icon-search"
    >搜尋</i>-->

    <el-button type="primary" round plain class="icon-search" icon="el-icon-search" @click="handleSearchValue">搜尋</el-button>
  </div>
</template>



<script>
import dayjs from 'dayjs';
import CusForm from '@/components/customElement/CusForm.vue';
import CusItemWrapper from '@/components/customElement/CusItemWrapper.vue';
import CusInput from '@/components/customElement/CusInput.vue';
import CusSwitch from '@/components/customElement/CusSwitch.vue';
import CusSelector from '@/components/customElement/CusSelector.vue';
import CusDatePicker from '@/components/customElement/CusDatePicker.vue';
import CusDateRangePicker from '@/components/customElement/CusDateRangePicker.vue';
import tpltInputConfig from '@/config/tpltInputConfig';
import { setTime } from '@/utils/usefulHelper';

export default {
  name: 'CusSearch',
  components: {
    CusForm,
    CusItemWrapper,
    CusInput,
    CusSwitch,
    CusSelector,
    CusDatePicker,
    CusDateRangePicker
  },
  props: {
    searchConfig: {
      type: Array,
      default() { return []; }
    }
  },
  data() {
    return {
      configList: [],
    };
  },
  methods: {
    setDefaultValue() {
      // 設值
      this.configList = this.searchConfig.map((item) => {
        item.value = item.defaultValue;
        return item;
      });

    },
    handleSearchValue() {
      let searchParams = {};
      this.configList.forEach((item) => {
        searchParams[item.key] = item.value;

        if (item.type === 'dateRangePicker') {
          // null 發生在清除日期時, 空值發生在預設值為空時，這裡只判斷一個
          if (item.value === null || item.value[0] === '') {
            searchParams.dateRange = ['', ''];
          } else {
            // 初始日期的00:00 到 結束日期的23:59
            item.value[0] = dayjs(item.value[0]).format('YYYY-MM-DD HH:mm:ss');
            item.value[1] = dayjs(item.value[1])
              .add(86399, 'second')
              .format('YYYY-MM-DD HH:mm:ss');
          }
        }
      });

      console.log('searchParams', searchParams);

      this.$emit('handlSearch', searchParams);
    },
  },
  created() {

    this.setDefaultValue();
  }
};
</script>

<style lang="scss" scoped>
</style>