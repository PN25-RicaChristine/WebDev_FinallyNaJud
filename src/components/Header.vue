<template>
  <div>
    <v-app-bar id="head" dark>
      <v-toolbar-title><a  @click="home()"><v-img src="@/assets/logoSpotMe.png"></v-img></a></v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        text
        @click="signin()"
        v-show="$route.path === '/register' || $route.path === '/login'  || $route.path === '/'? true : false"
      >Sign up</v-btn>
      <v-btn
        text
        @click="login()"
        v-show="$route.path === '/register' || $route.path === '/login'  || $route.path === '/'? true : false"
      >Login</v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    signin() {
      this.$router.push("/register");
    },
    login() {
      this.$router.push("/login");
    },
    home() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
#search {
  margin-top: 20px;
}
#head {
  padding-top: 2px;
  background-color: #cd853f;
}
</style>