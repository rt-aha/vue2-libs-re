<template>
  <tbody class="re-table-body">
    <tr class="re-table-body__tr" v-for="rowData of tableData" :key="rowData.name"
    :class="[
      {
        're-table-body__tr--stripe': stripe
      }
    ]"
      data-other="hihi"
      :style="setRowColor(rowData)"
    >
    <!-- style="background-color: #FFD700" -->
      <td
        class="re-table-body__tr__td"

        v-for="col of tableColumns"
        :key="col.prop"
        :width="col.width || 'auto'"
        :style="col.cssStyle"
      >
        <!-- {{ setRowColor(rowData) }} -->
        {{ formatter(rowData[col.prop], rowData, col) }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'ReTableBody',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    columnConfig: {
      type: Array,
      default: () => [],
    },
    tableColumns: {
      type: Array,
      default: () => [],
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    rowColor: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    rowColorObj() {
      return this.rowColor.reduce((obj, ele) => {
        obj[ele.prop] = ele;

        return obj;
      }, {});
    },
    rowColorKeys() {
      return this.rowColor.map((ele) => ele.prop);
    },
  },
  methods: {
    formatter(data, rowData, col) {
      if (col.formatter) {
        return col.formatter(data);
      }

      return data;
    },

    // 取出keys, 根據所寫陣列逐個比對，後面的會覆蓋前面的
    setRowColor(rowData) {
      const rowDataKeys = Object.keys(rowData);
      const existKeys = this.rowColorKeys.filter((ele) => rowDataKeys.includes(ele));
      let bgColor = {};

      existKeys.forEach((key) => {
        if (this.rowColorObj[key].condition) {
          const isMatchCondition = this.rowColorObj[key].condition(rowData[key], rowData);
          if (isMatchCondition) {
            bgColor = { backgroundColor: this.rowColorObj[key].color };
          }
        }
      });

      return bgColor;
    },

  },
};
</script>

<style lang="scss">

.re-table-body {
  overflow: hidden;
  &__tr {
    border-bottom: 1px solid $c-lightgrey;
    /* background-color: #f00; */

    &--stripe {
      &:nth-child(2n) {
        background-color: $c-lightgrey;
      }
    }
    &__td {
      @include box-padding(10px);
      border-right: 1px solid #cccccc;
      @include font-style($c-assist, 14px);

    }

    &:last-child {
      border-bottom: 0px transparent;
    }

  }
}
</style>
