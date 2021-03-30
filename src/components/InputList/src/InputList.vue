<template>
  <div class="re-input-list">
    <re-row>
      <re-button @click="addItem">新增</re-button>
    </re-row>
    <re-row v-for="item of inputList" :key="item.id">
      <re-input v-model="item.value" />
       <re-button
       @click="handleClick(item.id)"
       style="margin-left: 10px"
        type="border"
         round="default" >移除</re-button>
    </re-row>

  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
  name: 'ReInputList',
  props: {
    value: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      inputList: [],
    };
  },
  methods: {
    convertInputList() {
      this.inputList = this.value;
      this.$emit('input', this.inputList);
    },
    handleClick(id) {
      this.inputList = this.inputList.filter((item) => item.id !== id);
    },
    addItem() {
      this.inputList = this.inputList.push({
        id: uuid(),
        value: '',
      });
    },
  },
  watch: {
    value: {
      handler: 'convertInputList',
      immediate: true,
      // deep: true
    },
  },
};
</script>

<style lang="scss">
</style>
