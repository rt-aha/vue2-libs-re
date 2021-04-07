<template>
  <div class="view-table">
    <re-title :mt="false">表格</re-title>

    <re-search-filter
      :searchConfig="searchFilter"
      :labelConfig="labelConfig"
      @search="handleSearch"
    />

    <re-table
      :tableData="tableData"
      :columnsConfig="columnsConfig"
      :stripe="false"
      :rowColor="rowColor"
      :maxHeight="200"
    >
      <template v-slot:name="scope"> {{ scope.data.value }} 111 </template>
    </re-table>

    <re-row justifyContent="flex-end">
      <re-pagination
        @handlePageInfo="handlePageInfo"
        @handleTo="handleTo"
        @handlePageSize="handlePageSize"
        @handlePager="handlePager"
        :order="pagination.order"
        :total="pagination.total"
        :to="pagination.to"
        :pager="pagination.pager"
        :pageSize="pagination.pageSize"
      />
    </re-row>
  </div>
</template>

<script>
import { getTableDataAPI } from '@/api/test';
import { isNumber } from 'lodash';
import {
  selectOptions,
  radioOptions,
  checkboxOptions,
  checkboxOptionsAgree,
} from './test-config';

export default {
  name: 'Table',
  data() {
    return {
      labelConfig: {
        position: 'left', // top, left
        width: '100',
        textAlign: 'right', // left, right
      },
      searchFilter: [
        {
          label: '姓名',
          prop: 'name',
          value: '',
          type: 'input',
        },
        {
          label: '啟用',
          prop: 'enable',
          value: true,
          type: 'switch',
        },
        {
          label: '年收入',
          prop: 'income',
          value: 0,
          type: 'select',
          options: selectOptions,
        },
        {
          label: '職業',
          prop: 'occupation',
          value: 0,
          type: 'radio',
          options: radioOptions,
        },
        {
          label: '興趣愛好',
          prop: 'interest',
          value: [],
          type: 'checkbox-group',
          options: checkboxOptions,
        },
        {
          label: '手續費',
          prop: 'fee',
          value: 9,
          type: 'input-number',
          placeholder: 'fee',
        },
        {
          label: '日期',
          prop: 'date',
          value: new Date(),
          type: 'date-picker',
        },
        {
          label: '時間',
          prop: 'time',
          value: new Date(),
          type: 'time-picker',
        },
        {
          label: '日期時間',
          prop: 'dateTime',
          value: new Date(),
          type: 'date-time-picker',
        },
      ],
      pagination: {
        order: ['total', 'page-size', 'pager', 'to'],
        pageSize: [10, 50, 100],
        pager: {
          totalPage: 6,
          pageIndex: 1,
          pageSize: 10,
        },
      },
      rowColor: [
        {
          prop: 'height',
          color: '#66CDAA',
          condition: (val, rowData) => val > 170,
        },
        {
          prop: 'status',
          color: '#B0E0E6',
          condition: (val, rowData) => val,
        },
      ],
      tableData: [],
      columnsConfig: [
        // {
        //   prop: 'checkbox',
        //   header: '框',
        //   width: 50,
        //   style: { color: '#f00' },
        //   headerAlign: 'center',
        //   align: 'right',

        // },
        {
          prop: 'name',
          header: '名字',
          width: 150,
        },
        {
          prop: 'age',
          header: '年齡',
          width: 100,
        },
        {
          prop: 'height',
          header: '身高',
          width: 100,
          formatter: this.convertToMeter,
          fixed: 'right',
        },

        {
          prop: 'status',
          header: '狀態',
          width: 150,
          formatter: this.isError,
          cusStyle: this.errorColor,
        },
        {
          prop: 'weight',
          header: '體重',
          width: 150,
          render: (data, rowData, col) => ({
            render(h) {
              return h('div', {}, data);
            },
          }),
        },

        {
          prop: 'action',
          header: '操作',
          width: 280,
          render: (data, rowData, col) => {
            const self = this;

            return {
              render(h) {
                return h('div', [
                  h('re-button', '新增'),
                  h('re-button', { on: { click: self.handlClick } }, '編輯'),
                  h(
                    're-button',
                    {
                      style: {
                        'background-color': '#CD5C5C',
                        'border-color': '#CD5C5C',
                      },
                    },
                    '刪除',
                  ),
                ]);
              },
            };
          },
        },
      ],
    };
  },
  created() {
    this.getData();
  },

  methods: {
    handleSearch(data) {
      console.log('handle SEarch');
      console.log(
        data.reduce((obj, item) => {
          obj[item.label] = item.value;
          return obj;
        }, {}),
      );
    },
    handlClick() {
      console.log('click...');
    },
    async getData() {
      const res = await getTableDataAPI();

      this.tableData = res;
    },
    errorColor(val) {
      if (val === 'error') {
        return {
          color: '#CD5C5C',
        };
      }
    },
    convertToMeter(val) {
      if (isNumber(val)) {
        const h = val / 100;
        return h.toFixed(2);
      }

      return '-';
    },
    isError(val) {
      return val === 'error' ? '錯誤' : '-';
    },
    handlePageInfo(info) {
      console.log('info...', info);
    },

    handlePageSize(pageSize) {
      console.log('handlePager-pageSize', pageSize);
      this.pagination.pager.pageSize = pageSize;
    },
    handlePager(pageIndex) {
      console.log('handlePager-pageIndex', pageIndex);
      this.pagination.pager.pageIndex = pageIndex;
    },
    handleTo(pageIndex) {
      console.log('handleTo-pageIndex', pageIndex);
      this.pagination.pager.pageIndex = pageIndex;
    },
  },
};
</script>

<style lang="scss">
.view-table {
  @include box-padding(10px);
}
</style>
