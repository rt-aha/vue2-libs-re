<template>
  <div class="view-table">
    <re-title :mt="false">表格</re-title>
    <re-table
     :tableData="tableData"
     :columnsConfig="columnsConfig"
     :stripe="false"
     :rowColor="rowColor"
     :maxHeight="200">
     <template v-slot:name="scope">
       {{scope.data.value}} 111
     </template>
    </re-table>
  </div>
</template>

<script>
import { getTableDataAPI } from '@/api/test';
import { isNumber } from 'lodash';

export default {
  name: 'Table',
  data() {
    return {
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

            return ({
              render(h) {
                return h('div',
                  [
                    h('re-button', '新增'),
                    h('re-button', { on: { click: self.handlClick } }, '編輯'),
                    h('re-button', {
                      style: { 'background-color': '#CD5C5C', 'border-color': '#CD5C5C' },
                    }, '刪除'),
                  ]);
              },
            });
          },
        },
      ],
    };
  },
  created() {
    this.getData();
  },

  methods: {
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
  },
};
</script>

<style lang="scss">
.view-table {
  @include box-padding(10px);
}
</style>
