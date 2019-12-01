<template>
  <v-app>
    <Header/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from 'components/Header.vue';

export default {
  name: "app",
  components: {
    Header,
  }
};
</script>
