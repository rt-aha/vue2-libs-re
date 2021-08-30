<template>
  <div class="page-carousel">
    <re-carousel :carouselList="carouselList"></re-carousel>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import kyoto from '@/assets/carousel/kyoto.jpeg';
import tokyo from '@/assets/carousel/tokyo.jpeg';
import kyusyu from '@/assets/carousel/kyusyu.jpeg';
import nagoya from '@/assets/carousel/nagoya.jpeg';
import hokkaido from '@/assets/carousel/hokkaido.jpeg';

export default {
  name: 'PageCarousel',
  data() {
    return {
      carouselList: [
        {
          title: 'kyoto',
          id: uuid(),
          src: kyoto,
        },
        {
          title: 'tokyo',
          id: uuid(),
          src: tokyo,
        },
        {
          title: 'kyusyu',
          id: uuid(),
          src: kyusyu,
        },
        {
          title: 'nagoya',
          id: uuid(),
          src: nagoya,
        },
        {
          title: 'hokkaido',
          id: uuid(),
          src: hokkaido,
        },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
