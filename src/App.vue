<template>
  <v-app>
    <Header @searchCat="getCat" />
    <router-view :category="chosenCategory"></router-view>
  </v-app>
</template>

<script>
import Header from 'components/Header.vue';

export default {
  name: "app",
  components: {
    Header,
  },data() {
    return {
    chosenCategory:"", 
  }},methods: {
    getCat(val) {
      this.chosenCategory = val;
    }
  }
};
</script>
