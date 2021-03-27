<template>
  <div class="inner">
   <button @click="$emit('handleCompC', 'byebye')">inner</button>

   gretting: {{$attrs.greeting}}
   yourName: {{$attrs.yourName}}
  </div>
</template>

<script>
export default {
  name: 'Inner',
};
</script>
