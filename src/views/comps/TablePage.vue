<template>
  <div class="view-table">
    <re-title :mt="false">表格</re-title>
    <re-table
    :tableData="tableData"
     :columnConfig="columnConfig"
     :stripe="false"
     :rowColor="rowColor"
     :maxHeight="200">
      <re-table-column prop="name" label="名字" width="150" />
      <re-table-column
        prop="age"
        label="年齡"
        width="100"
        :cssStyle="{
            color: '#F00',
          }"
      />
      <re-table-column prop="height" label="身高"
      :formatter="convertToMeter"/>
      <re-table-column prop="status" label="狀態"
      :formatter="isError" fixed="right"/>
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
          color: '#F0E68C',
          condition: (val, rowData) => val > 170,
        },
        {
          prop: 'status',
          color: '#FFA07A',
          condition: (val, rowData) => val,
        },
      ],
      tableData: [],
      columnConfig: [
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
          style: { color: '#f00' },
          headerAlign: 'center',
          align: 'right',

        },
        {
          prop: 'age',
          header: '年齡',
          cssStyle: {
            color: '#F00',
          },
        },
        {
          prop: 'height',
          header: '身高',
        },
        {
          prop: 'action',
          header: '操作',
          // width: 100,
        },
        // {
        //   prop: 'action2',
        //   header: '操作2',
        //   width: 200,
        //   render: [
        //     {
        //       template: RButton,
        //       title: 'Click1',
        //       click: doSomething1,
        //     },
        //     {
        //       template: RButton,
        //       title: 'Click2',
        //       click: doSomething2,
        //     },
        //   ],
        // },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await getTableDataAPI();

      this.tableData = res;
    },
    convertToMeter(val) {
      if (isNumber(val)) {
        const h = val / 100;
        return h.toFixed(2);
      }

      return '-';
    },
    isError(val) {
      if (val === 'error') {
        return '錯誤';
      }

      return '-';
    },
  },
};
</script>

<style lang="scss">
.view-table {
  @include box-padding(10px);
}
</style>
