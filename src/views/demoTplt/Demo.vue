<template>
  <div>

    <SubTitle subTitle="Ajax" />
    <Ajax></Ajax>
    <SubTitle subTitle="UI" />
    <UI></UI>
    <SubTitle subTitle="Validate" />
    <Validate></Validate>
    <SubTitle subTitle="Transform" />
    <Trans></Trans>

  </div>
</template>

<script>
import Ajax from '@/components/demoTplt/Ajax.vue';
import Trans from '@/components/demoTplt/Trans.vue';
import UI from '@/components/demoTplt/UI.vue';
import Validate from '@/components/demoTplt/Validate.vue';
import SubTitle from '@/components/global/SubTitle';


export default {
  name: 'Demo',
  components: {
    Ajax,
    Trans,
    UI,
    Validate,
    SubTitle
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>