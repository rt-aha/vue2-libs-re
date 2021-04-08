<template>
  <div class="re-input-list">
    <re-row :mt="false">
      <re-button @click="addItem">新增</re-button>
    </re-row>
    <re-row v-for="item of inputList" :key="item.id">
      <re-input v-model="item.value" @blur="handleBlur"/>
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
import triggerValidate from '@/mixins/triggerValidate';

export default {
  name: 'ReInputList',
  mixins: [triggerValidate],
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
    handleBlur(e) {
      this.updateValue();
      this.triggerValidate('blur', this.inputList);
    },
    updateValue() {
      this.$emit('input', this.inputList);
    },
    handleClick(id) {
      this.inputList = this.inputList.filter((item) => item.id !== id);
      this.updateValue();
      this.triggerValidate('extra-remove', [], { event: 'remove' });
    },
    addItem(e) {
      e.preventDefault();
      this.inputList.push({
        id: uuid(),
        value: '',
      });
      this.updateValue();
    },
    setInnerValue() {
      this.inputList = this.value;
    },
  },
  created() {
    this.setInnerValue();
  },
  watch: {
    value: {
      handler: 'setInnerValue',
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss">
</style>
