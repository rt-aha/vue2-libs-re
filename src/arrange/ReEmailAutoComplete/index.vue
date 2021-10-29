<template>
  <div class="re-select">
    <div class="re-select__input">
      <input
        class="re-select__input__field"
        :class="[
          `re-select__input__field--${inputStyle}`,
          {
            're-select__input__field--disabled': disabled,
          },
        ]"
        v-model="emailValue"
        @click.stop
        @input="handleChange"
        @change="handleChange"
        @focus="expandOptions"
        :disabled="disabled"
        autocomplete="off"
        :id="customId"
        @keyup.enter="handleKeyupEnter"
        @keydown.down.prevent.stop="handleKeyboardDown"
        @keydown.up.prevent.stop="handleKeyboardUp"
        @blur="handleBlur"
        v-bind="$attrs"
        ref="inputField"
      />
    </div>
    <re-expand-container :visible.sync="isExpand">
      <div
        class="re-select__option__content"
        :class="[`re-select__option__content--${inputStyle}`]"
        ref="emailContiner"
      >
        <div class="re-select__option__content__list">
          <re-select-option
            v-for="opt of extraOptions"
            :key="opt.value"
            v-bind="opt"
            :optionConfig="opt"
            :currOption="value"
            :currFocusOptionValue="currFocusOptionValue"
            @handleSelect="handleSelect"
            @removeOption="removeOption"
            @setFocusOptionValue="setFocusOptionValue"
          />
        </div>
      </div>
    </re-expand-container>
  </div>
</template>

<script>
import ReSelectOption from '@/components/global/ReEmailAutoComplete/ReSelectOption.vue';
import ReExpandContainer from '@/components/global/ReEmailAutoComplete/ReExpandContainer.vue';
import CategoryTitle from '@/components/global/ReEmailAutoComplete/CategoryTitle.vue';
import regExp from '@/utils/validate/regExp';

export default {
  $_veeValidate: {
    value() {
      return this.emailValue;
    },
  },
  name: 'ReEmailAutoComplete',
  components: {
    ReSelectOption,
    ReExpandContainer,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      default: '',
    },
    options: {
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
    customId: {
      default: null,
    },
    // 放在多輸入框
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isExpand: false,
      isFocus: false,
      visible: false,
      emailValue: '',
      extraOptions: [],
      emailDomains: [],
      isBlur: false,
      currFocusOptionValue: '',
    };
  },
  methods: {
    setValue() {
      this.emailValue = this.value;
    },
    closeOptions(e) {
      this.isExpand = false;
    },
    handleSelect(selectedValue) {
      if (selectedValue.indexOf('is-group-title') > -1) return;
      let fullEmail = '';
      if (this.emailValue.indexOf('@') > -1) {
        const account = this.emailValue.split('@')[0];
        fullEmail = `${account}@${selectedValue}`;
      } else {
        fullEmail = `${this.emailValue}@${selectedValue}`;
      }
      this.emailValue = fullEmail;
      this.$emit('input', this.emailValue);
      this.setOptions();
      this.closeOptions();
      this.currFocusOptionValue = '';
    },
    setFocusOptionValue(selectedValue) {
      if (selectedValue.indexOf('is-group-title') > -1) return;
      this.currFocusOptionValue = selectedValue;
    },
    removeOption(val) {
      if (this.storageKey === '') return;
      const storageOptions = localStorage.getItem(this.storageKey);
      if (!storageOptions) return;
      const emailOptions = JSON.parse(storageOptions);
      // 要移除的 domain
      const filterOptions = emailOptions.filter((item) => {
        return item.value !== val;
      });
      if (filterOptions.length === 0) {
        localStorage.removeItem(this.storageKey);
      } else {
        localStorage.setItem(this.storageKey, JSON.stringify(filterOptions));
      }
      this.combineEmailDomains();
    },
    expandOptions() {
      if (!this.emailValue || this.emailValue.split('@').length !== 2 || regExp.email.test(this.emailValue)) {
        this.isExpand = false;
        return;
      }
      this.isExpand = true;
    },
    handleBlur() {
      this.$emit('blur');
    },
    handleChange(e) {
      this.$emit('input', e.target.value);
      if (this.disabled) return;
      if (!e.target.value || this.emailValue.split('@').length !== 2) {
        this.isExpand = false;
        return;
      }
      this.isExpand = true;
      this.$emit('change');
    },
    handleKeyupEnter() {
      // 若開啟狀態
      if (this.isExpand) {
        const isDomainExist = this.extraOptions.find((opt) => {
          return opt.value === this.currFocusOptionValue;
        });

        if (isDomainExist) {
          this.handleSelect(this.currFocusOptionValue);
          return;
        } else {
          this.closeOptions();
          return;
        }
      }

      if (this.multiple) {
        if (this.value) {
          this.$emit('addNewOne');
        }
      }
    },
    handleKeyboardDown() {
      let nextIdx = 0;

      if (this.currFocusOptionValue === '') {
        nextIdx = 0;
      } else {
        this.extraOptions.forEach((opt, idx) => {
          if (opt.value === this.currFocusOptionValue) {
            nextIdx = idx + 1;

            if (nextIdx >= this.extraOptions.length) {
              nextIdx = 0;
            }
          }
        });
      }

      const emailContinerEle = this.$refs.emailContiner;

      if (nextIdx >= 6) {
        emailContinerEle.scrollTo({
          top: 34 * nextIdx,
        });
      }

      if (nextIdx === 0) {
        emailContinerEle.scrollTo({
          top: 0,
        });
      }

      this.currFocusOptionValue = this.extraOptions[nextIdx].value;
    },
    handleKeyboardUp() {
      let prevIdx = 0;
      const latestIdx = this.extraOptions.length - 1;

      if (this.currFocusOptionValue === '') {
        prevIdx = latestIdx;
      } else {
        this.extraOptions.forEach((opt, idx) => {
          if (opt.value === this.currFocusOptionValue) {
            prevIdx = idx - 1;

            if (prevIdx < 0) {
              prevIdx = latestIdx;
            }
          }
        });
      }

      const emailContinerEle = this.$refs.emailContiner;
      emailContinerEle.scrollTo({
        top: 34 * prevIdx,
      });

      this.currFocusOptionValue = this.extraOptions[prevIdx].value;
    },
    combineEmailDomains() {
      this.emailDomains = this.options;
      const storageOptions = localStorage.getItem(this.storageKey);
      if (storageOptions) {
        let laborRewardEmailOption = JSON.parse(storageOptions);
        laborRewardEmailOption = laborRewardEmailOption.map((item) => {
          item.allowedDelete = true;
          return item;
        });
        const frequentTitle = {
          render: () => CategoryTitle,
          label: 'frequentTitle',
          value: 'is-group-title-1',
          title: '常用 Email',
          disabled: true,
        };
        const historyTitle = {
          render: () => CategoryTitle,
          label: 'historyTitle',
          value: 'is-group-title-2',
          title: '曾使用 Email（儲存上限 100 筆）',
          disabled: true,
        };
        this.emailDomains = [frequentTitle, ...this.options, historyTitle, ...laborRewardEmailOption];
      }
      this.setOptions();
    },
    setOptions() {
      const [account, domain] = this.emailValue.split('@');
      this.extraOptions = this.emailDomains.map((item) => {
        item.label = `${account}@${item.value}`;
        return item;
      });
      if (domain) {
        const isMatchDomain = this.emailDomains.some((item) => {
          return item.value.includes(domain);
        });
        if (isMatchDomain) {
          this.extraOptions = this.extraOptions.filter((item) => {
            return item.value.includes(domain);
          });
        }
      }
    },
  },
  created() {
    this.setValue();
    this.combineEmailDomains();
  },
  watch: {
    value: {
      handler: 'setValue',
    },
    emailValue: {
      handler(newVal, oldVal) {
        if (newVal !== null && oldVal !== null) {
          if (newVal.length !== oldVal.length) {
            this.setOptions();
          }
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.re-select {
  width: 100%;
  position: relative;

  &__input {
    width: 100%;
    cursor: pointer;

    &__field {
      @include box-padding(10px);
      width: 100%;
      border-radius: 10px;
      border: 2px solid $c-orange;
      background: $c-white;

      &--bottom-line {
        @include box-padding(6px 0);
        background-color: transparent;
        border: 0px;
        border-bottom: 1px solid $c-input-bottom;
        border-radius: 0;
        font-size: 20px;
        line-height: 1.5rem;

        &:focus {
          border-bottom: 1px solid $c-orange;
        }
      }

      &--e-receipt {
        @include box-padding(6px 0);
        background-color: transparent;
        border: 0px;
        border-bottom: 1px solid $c-input-bottom;
        border-radius: 0;
        font-size: 20px;
        line-height: 1.5rem;
        font-size: 18px;

        &:focus {
          border-bottom: 1px solid $c-orange;
        }
      }

      &--permission-bottom-line {
        @include box-padding(10px 0);
        border: 0px;
        border-bottom: 2px #ccc solid;
        border-radius: 0;
        font-size: 16px;
      }

      &--disabled {
        color: rgba(#000000, 0.4);
        cursor: not-allowed;
      }
    }
  }

  &__option {
    margin-top: 5px;
    @include position(tl, 100%, 0px);
    border: 1px solid $c-main;
    border-radius: 4px;
    overflow: hidden;
    z-index: 100;
    background-color: $c-white;

    &__content {
      height: auto;
      max-height: 204px;
      overflow: auto;
      position: relative;
    }
  }
}
</style>
