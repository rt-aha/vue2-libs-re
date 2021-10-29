<template>
  <div class="re-input-list">
    <ul class="input-list">
      <li class="input-list__item" v-for="(item, idx) of inputList" :key="item.id">
        <div class="input-list__item__input">
          <re-email-auto-complete
            v-model="item.value"
            @blur="handleBlur"
            @input="updateValue"
            :storageKey="storageKey"
            :inputStyle="inputStyle"
            :options="emailDomainList"
            @addNewOne="addItem"
            multiple
            placeholder="請輸入電子郵件信箱"
            :ref="item.id"
          />
        </div>
        <img
          v-show="idx !== 0"
          class="input-list__item__remove"
          src="@/assets/images/icon-delete.svg"
          @click="removeItem(item.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import ReEmailAutoComplete from '@/components/global/ReEmailAutoComplete/index.vue';
import emailDomainList from '@/components/global/ReEmailAutoComplete/emailDomainList';

export default {
  $_veeValidate: {
    value() {
      return this.value;
    },
  },
  name: 'MultiEmailAutoComplete',
  components: {
    ReEmailAutoComplete,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    storageKey: {
      type: String,
      default: '',
    },
    inputStyle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inputList: [],
      emailDomainList,
    };
  },
  methods: {
    handleBlur() {
      this.updateValue();
    },
    updateValue() {
      this.$emit('input', this.inputList);
      this.$emit('triggerValidate'); // ，手動觸發驗證，因為 inputList 的結構比較特別是 {id, value}[]
    },
    removeItem(id) {
      this.inputList = this.inputList.filter((item) => item.id !== id);
      this.updateValue();
    },
    addItem() {
      // 若 enter 不在更新之前的最後一個 input，且最後一個無值，不新增
      const lastIndex = this.inputList.length - 1;
      if (this.inputList[lastIndex].value === '') return;

      this.inputList.push({
        id: uuid(),
        value: '',
      });
      this.updateValue();

      // 更新值之後，待下一次更新完視圖時，將游標 focus 到下一個 input 上，
      this.$nextTick(() => {
        const lastIndex = this.inputList.length - 1;
        const lastInputId = this.inputList[lastIndex].id;

        this.$refs[lastInputId][0].$refs.inputField.focus();
      });
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
  &__item {
    @include flex();
    position: relative;

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

    &__remove {
      width: 14px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
}

.btn-icon {
  width: 20px;
}
</style>
