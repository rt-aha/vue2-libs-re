<template>
  <div class="view-general">
    <re-title :mt="false" @click="handleClick('button')">按鈕</re-title>
    <div v-if="comps['button']">
      <re-row :mt="false">
        <re-button> 預設按鈕 </re-button>
        <re-button :disabled="true"> disabled按鈕 </re-button>
        <re-button type="border"> border按鈕 </re-button>
        <re-button type="plain"> plain按鈕 </re-button>
      </re-row>
      <re-row>
        <re-button><template #prefix>pre</template>按鈕</re-button>
        <re-button><template #prefix>pre</template>按鈕<template #suffix>suf</template></re-button>
        <re-button>預設按鈕<template #suffix>suf</template></re-button>
      </re-row>
      <re-row>
        <re-button>字很長很長很長很長的按鈕</re-button>
        <re-button size="small"> 小按鈕 </re-button>
      </re-row>
      <re-row>
        <re-button :isLoading="true">按紐</re-button>
        <re-button :isLoading="true" type="border"> border按鈕 </re-button>
        <re-button :isLoading="true" type="plain"> plain按鈕 </re-button>
        <re-button :isLoading="true" size="small"> 小按鈕 </re-button>
      </re-row>
    </div>

    <re-title @click="handleClick('input')">輸入框</re-title>
    <div v-if="comps['input']">
      <re-row :mt="false">
        <re-input v-model="val.input" />
      </re-row>
      <re-row>
        <re-input v-model="val.input" :disabled="true"/>
      </re-row>
      <re-row>
        <re-input v-model="val.inputPw" type="password"/>
      </re-row>
      <re-row>
        <re-input v-model="val.input">
          <template #prepend>https://</template>
          <template #prefix>p</template>
          <template #suffix>s</template>
          <template #append>a</template>
        </re-input>
      </re-row>
    </div>

    <re-title @click="handleClick('switch')">開關</re-title>
    <div v-if="comps['switch']">
      <re-row :mt="false">
        <re-switch v-model="val.switch1"  />
      </re-row>
      <re-row>
        <re-switch v-model="val.switch2" :switchLabel="{on: '啟用', off: '關閉'}" :disabled="true"/>
      </re-row>
    </div>

    <re-title @click="handleClick('select')">下拉選單</re-title>
    <div v-if="comps['select']">
      <re-row :mt="false">
        <re-select v-model="val.select1" :options="selectOptions" />
      </re-row>
      <re-row>
        <re-select v-model="val.select2" :options="selectOptions" :disabled="true"/>
      </re-row>
    </div>

    <re-title @click="handleClick('radio')">單選框</re-title>
    <div v-if="comps['radio']">
      <re-row :mt="false">
        <re-radio v-model="val.radio1" :options="radioOptions" />
      </re-row>

      <re-row>
        <re-radio v-model="val.radio2" :options="radioOptions" :inline="false" />
      </re-row>
    </div>

    <re-title @click="handleClick('checkbox')">多選框</re-title>
    <div v-if="comps['checkbox']">
      <re-row>
        <re-checkbox v-model="val.checkbox1" :options="checkboxOptions" />
      </re-row>

      <re-row>
        <re-checkbox v-model="val.checkbox2" :options="checkboxOptions" :inline="false" />
      </re-row>
    </div>
  </div>
</template>

<script>
import { selectOptions, radioOptions, checkboxOptions } from './test-config';

export default {
  name: 'General',
  data() {
    return {
      comps: {
        button: true,
        input: true,
        switch: true,
        select: true,
        radio: true,
        checkbox: true,
      },
      val: {
        input: 'input-val',
        inputPw: 'input-val',
        switch1: true,
        switch2: false,
        select1: 5,
        select2: 2,
        radio1: 2,
        radio2: 3,
        checkbox1: [2],
        checkbox2: [1, 4, 5],
      },
      selectOptions,
      radioOptions,
      checkboxOptions,
    };
  },
  mounted() {
  },
  methods: {
    handleClick(type) {
      this.comps[type] = !this.comps[type];
    },
  },
};
</script>

<style lang="scss">
.view-general {
  @include box-padding(10px);
}
</style>
