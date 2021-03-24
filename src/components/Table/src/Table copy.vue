<template>
  <div class="re-table">
    <table class="re-table-main">
      <thead class="re-table-main__header">
        <tr
          class="re-table-main-row re-table-main__header__row"
          v-for="(row, rowIndex) of tableHeaderData"
          :key="row + String(rowIndex)"
          :style="row.rowCss"
        >
          <th
            class="re-table-main__header__row__cell"
            v-for="(config, cellIndex) of row.headerData"
            :key="config.prop + String(cellIndex)"
            :width="config.width || 'auto'"
            :class="genCellClass(config, 'header')"
          >
            {{ config.header }}
          </th>
        </tr>
      </thead>
      <tbody class="re-table-main__body" :class="genBodyClass('body')">
        <tr
          class="re-table-main-row re-table-main__body__row"
          v-for="(row, rowIndex) of tableBodyData"
          :key="row + String(rowIndex)"
          :style="row.rowCss"
        >
          <td
            class="re-table-main__body__row__cell"
            v-for="(cellData, cellIndex) of row.data"
            :key="cellData + String(cellIndex)"
            :width="cellData.config.width || 'auto'"
            :class="genCellClass(cellData.config, 'body')"
          >
            <template v-if="cellData.config.render">
              <component
                v-for="(comp, compIndex) of cellData.config.render"
                :key="rowIndex + compIndex"
                :is="comp.template"
                v-bind="{
                  value: cellData.value,
                  config: cellData.config,
                  rowData: cellData,
                  render: comp
                }"
                @click="handleClick"
              />
            </template>
            <span :style="cellData.config.style" v-else>
              {{ formatValue(cellData.value, cellData.config) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { v4 as uuid } from 'uuid';

export default {
  name: 'ReTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    columnConfig: {
      type: Array,
      default: () => [],
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    rowCss: {
      type: Function,
      default: () => ({}),
    },
  },
  data() {
    return {
      tableId: '',
      innerColumnConfig: [],
      bodyRowClass: '',
      tableBodyData: [],
      tableHeaderData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleClick(info) {
      this.$emit('click');
    },

    init() {
      let tableData = [];

      tableData = this.tableData.reduce((arr, data) => {
        const rowCss = this.rowCss(data);

        arr.push({
          rowCss,
          data: this.columnConfig.map((config) => ({
            rowData: data,
            value: data[config.prop],
            config,
          })),
        });

        return arr;
      }, []);

      console.log('tableData', tableData);

      this.tableBodyData = tableData;
      this.tableHeaderData = [
        { rowCss: () => ({}), headerData: this.columnConfig },
      ];

      // console.log('tableData...', tableData);
    },
    genBodyClass(type) {
      let attrClass = '';
      if (this.stripe && type === 'body') {
        attrClass = `r-table-main__${type}--stripe`;
      }

      return attrClass;
    },
    genCellClass(config, type) {
      let attrClass = '';
      if (type === 'header') {
        attrClass = `r-table-main__${type}__row__cell--align--${config.headerAlign}`;
      }

      if (type === 'body') {
        attrClass = `r-table-main__${type}__row__cell--align--${config.align}`;
      }

      return attrClass;
    },

    // 渲染前判斷一些東西
    formatValue(value, config) {
      // 如果有formatter
      if (config.formatter) {
        return config.formatter(value) || '-';
      }

      return value;
    },
  },
  watch: {
    tableData: {
      handler: 'init',
    },
  },
};
</script>

<style lang="scss">

.re-table {
  /* border: 1px solid $c-lightgrey; */
  border-radius: 4px;
}
.re-table-main-row {
  /* border: 0px transparent; */
}

.re-table-main {
  /* border: 1px solid #ccc; */
  width: 100%;

  &__header {
    &__row {
      /* border-bottom: 1px solid $c-lightgrey; */
      /* border-top: 1px solid $c-lightgrey;
      border-bottom: 1px solid $c-lightgrey; */

      &__cell {
        border: 1px solid $c-lightgrey;
        text-align: left;
        @include box-padding(10px);
        @include font-style($c-assist, 14px) /* border: 1px solid #ccc; */;

        &--align--left {
          text-align: left;
        }

        &--align--center {
          text-align: center;
        }

        &--align--right {
          text-align: right;
        }
      }
    }
  }

  &__body {
    &--stripe {
      tr {
        &:nth-child(even) {
          background-color: rgba(#efefef, 0.5);
        }
      }
    }

    &__row {

      &+& {
        border-top: 1px solid $c-lightgrey;

      }

      &__cell {
        border: 1px solid $c-lightgrey;
        text-align: left;
        @include box-padding(10px);
        @include font-style($c-assist, 14px) /* border: 1px solid #ccc; */;

        &--align--left {
          text-align: left;
        }

        &--align--center {
          text-align: center;
        }

        &--align--right {
          text-align: right;
        }
      }
    }
  }
}
</style>
