<template>
  <div class="comp-agreement">
    <p class="agreement-title">ＯＯＸＸ協議書</p>
    <p class="agreement-desc">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis mollitia, temporibus blanditiis debitis
      dolorum aliquam illum accusamus voluptates sed, nesciunt incidunt, ad vero est! Velit hic nesciunt ipsum harum
      ipsam soluta aperiam eum autem quos consequuntur, voluptate ipsa laboriosam facere sequi illo? Voluptas,
      laboriosam iusto nulla nisi similique officiis repellendus accusantium porro delectus dolorem sapiente reiciendis
      illo inventore perspiciatis architecto ab suscipit. Explicabo numquam amet, magnam cum eum laborum quam voluptatum
      repellat dignissimos ullam corporis dolores sunt totam reiciendis delectus porro harum sapiente quaerat voluptate
      recusandae aperiam deserunt? Impedit beatae laborum eveniet nam officia alias voluptatibus harum unde reiciendis
      et!
    </p>
  </div>
</template>

<script>
export default {
  name: 'Agreement',
};
</script>

<style lang="scss" scoped>
.comp-agreement {
  @include box-padding(15px);
  border: 1px solid $c-assist;
  border-radius: 10px;
}

.agreement-title {
  @include font-style($c-main, 24px);
}

.agreement-desc {
  @include font-style($c-text1, 14px);
}
</style>
