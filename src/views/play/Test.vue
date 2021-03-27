<template>
  <div>
    <outer greeting="hello" yourName="Becky" @handleCompC="handleCompC"/>

    <!-- <input v-model="firstName">
    <input v-model="lastName">
    <p>{{fullName}}</p> -->
    <input v-model="fullName">

    <p>{{firstName}} {{lastName}}</p>
    <p>---</p>
    <render :msg="msg"/>
  </div>
</template>

<script>
import Outer from '@/views/play/Outer.vue';
import Render from '@/views/play/Render.vue';

export default {
  name: 'Test',
  components: {
    Outer,
    Render,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      msg: 'message',
    };
  },
  computed: {
    fullName: {
      get() {
        console.log('getter ...');
        if (!this.firstName && !this.lastName) {
          return '';
        }
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        console.log('setter...', value);
        const [first, last] = value.split(' ');
        console.log('first', first);
        console.log('last', last);
        this.firstName = first;
        this.lastName = last;
      },
    },
  },
  methods: {
    handleCompC(val) {
      console.log('val...', val);
    },
  },
  mounted() {
    console.log('mounted', this);

    setTimeout(() => {
      this.msg = 'change !';
    }, 2000);
  },
  updated() {
    console.log('update!');
  },
};
</script>
