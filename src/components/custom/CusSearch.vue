<template>
  <div class="custom-search">
    <div class="search-type-box"
         v-for="(config,index) of configList"
         :key="index">

      <CusItemWrapper label="輸入框"
                      v-if="config.type === 'input'">
        <SearchEleInput v-model="config.value"
                        :inputConfig="config" />
      </CusItemWrapper>

      <CusItemWrapper label="下拉"
                      v-if="config.type === 'selector'">
        <SearchEleSelector v-model="config.value"
                           :selectorConfig="config" />
      </CusItemWrapper>

      <CusItemWrapper label="日期"
                      v-if="config.type === 'datePicker'">
        <SearchEleDatePicker v-model="config.value"
                             :datePickerConfig="config" />
      </CusItemWrapper>

      <CusItemWrapper label="日期範圍"
                      v-if="config.type === 'dateRangePicker'">
        <SearchEleDateRangePicker v-model="config.value"
                                  :dateRangePickerConfig="config" />
      </CusItemWrapper>
    </div>

    <!-- <i class="el-icon-search icon-search"
     >搜尋</i> -->

    <el-button type="primary"
               round
               plain
               class="icon-search"
               icon="el-icon-search"
               @click="handleSearchValue">搜尋</el-button>

  </div>
</template>



<script>
import dayjs from 'dayjs';

import CusItemWrapper from '@/components/custom/CusItemWrapper';
import SearchEleDatePicker from '@/components/searchElement/SearchEleDatePicker.vue';
import SearchEleDateRangePicker from '@/components/searchElement/SearchEleDateRangePicker.vue';
import SearchEleInput from '@/components/searchElement/SearchEleInput.vue';
import SearchEleSelector from '@/components/searchElement/SearchEleSelector.vue';




export default {
  name: 'CusSearch',
  components: {
    CusItemWrapper,
    SearchEleDatePicker,
    SearchEleDateRangePicker,
    SearchEleInput,
    SearchEleSelector,
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


      this.$emit('handlSearch', searchParams);
    },
  },
  created() {

    this.setDefaultValue();
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>