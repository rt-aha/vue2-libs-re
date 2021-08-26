<template>
  <div class="re-input-list">
    <re-row :mt="false">
      <re-button @click="addItem" type="border" :style="{ border: '1px solid #4caf50' }">
        <img class="btn-icon" src="@/assets/icon/add.svg" />
      </re-button>
    </re-row>
    <ul class="input-list">
      <li class="input-list__item" v-for="item of inputList" :key="item.id">
        <div class="input-list__item__input">
          <re-input v-model="item.value" @blur="handleBlur" />
        </div>
        <div class="input-list__item__btn-wrap">
          <re-button
            @click="handleClick(item.id)"
            type="border"
            :style="{ border: '1px solid #cd5c5c' }"
            round="default"
          >
            <img class="btn-icon" src="@/assets/icon/delete.svg" />
          </re-button>
        </div>
      </li>
    </ul>
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
      default: () => [],
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

<style lang="scss" scoped>
.input-list {
  margin-top: 10px;

  &__item {
    @include flex();

    & + & {
      margin-top: 10px;
    }

    &__input {
      flex: 1;
    }

    &__btn-wrap {
      @include flex();
      flex: none;
      width: auto;
      margin-left: 10px;
    }
  }
}

.btn-icon {
  width: 20px;
}
</style>
