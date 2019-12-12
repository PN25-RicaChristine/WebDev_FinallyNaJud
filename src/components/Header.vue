<template>
  <div>
    <v-app-bar id="head" dark>
      <v-toolbar-title>
        <img
          src="https://raw.githubusercontent.com/PN25-RicaChristine/WebDev_FinallyNaJud/master/src/assets/logoSpotMe.png"
        />
      </v-toolbar-title>
      <v-spacer></v-spacer>
    
      <v-spacer></v-spacer>
        <form @submit.prevent="searchCat">
      <v-row no-gutters>
        <v-col md="auto">
          <v-autocomplete
            v-show="$route.path === '/dashboard' || $route.path === '/bloggerdashboard'"
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            class="mx-2"
            flat
            color="orange"
            prepend-inner-icon="mdi-magnify"
            hide-no-data
            hide-details
            label="e.g Hotel"
            solo-inverted
          ></v-autocomplete>
        </v-col>
        <v-col lg="2">
          <v-btn text @click="searchCat">Search</v-btn>
        </v-col>
      </v-row>
        </form>

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
      logo: require("assets/logoSpotMe.png"),
      category: "",
      loading: false,
      items: [],
      search: null,
      select: null,
      states: ["Hotel", "Mountain", "Beach", "Historical"]
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
    category(val) {
      this.retrieveCat(val);
    }
  },
  methods: {
    searchCat() {
      
      this.$emit("searchCat", this.select);
    },
    signin() {
      this.$router.push("/register");
    },
    login() {
      this.$router.push("/login");
    },

    getCategory(category) {
      this.category = category;
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
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