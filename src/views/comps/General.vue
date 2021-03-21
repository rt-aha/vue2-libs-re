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
  </div>
</template>

<script>

export default {
  name: 'General',
  data() {
    return {
      comps: {
        button: true,
        input: true,
      },
      val: {
        input: 'input-val',
        inputPw: 'input-val',
      },
    };
  },
  methods: {
    handleClick(type) {
      console.log('this.comps[type]', this.comps[type]);
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
