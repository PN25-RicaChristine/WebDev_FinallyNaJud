<template>
  <div>
    <v-row>
      <v-col cols="auto" lg="3">
        <v-list>
          <!-- sidebar -->
          <v-list-item style="text-align:center">
            <v-img
              id="image"
              :src="'http://localhost:3000/'+filename"
              style="border:1px solid orange"
              height="200"
              max-width="200"
            ></v-img>
            <v-spacer></v-spacer>
          </v-list-item>
          <v-list-item link two-line class="title">
            <v-list-item-content>
              <v-list-item-title>{{name}}</v-list-item-title>
              <v-list-item-subtitle>{{type}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list v-for="item in items" :key="item.title">
          <v-list-item link @click="redirect(item.href)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-btn @click="logout">Logout</v-btn>
      </v-col>
      <v-col cols="8">
        <!-- Create Post -->

        <div class="uploaded_post">
          <div>
            <br />
            <br />
            <Post v-on:uploaded="updatePosts" />
          </div>
        </div>
        <!-- Posts -->
        <Uploaded_Post :posts="this.posts" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
#image {
  float: center;
  width: 20px;
}

#sidebar {
  padding-top: 0px;
}
#search {
  width: 50px;
}
#desbody {
  width: 3%;
  margin-top: 20%;
}
#title {
  background-color: lightgray;
}
#drawer {
  background-color: lightgray;
}
#input {
  width: 95%;
  height: 50%;
  margin-left: 2%;
}
#post {
  margin-top: 4%;
}
#text {
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 2%;
}
#postbutton {
  margin-right: 2%;
}
#fileinput {
  margin-left: 2%;
}
</style>


<script>
import Post from "components/Post.vue";
import Uploaded_Post from "components/Uploaded_Posts.vue";
import axios from "axios";
import AUTH from "@/auth";

export default {
  components: {
    Uploaded_Post,
    Post
  },
  data() {
    AUTH;
    return {
      loadingFlag: false,
      filename: "",
      name: AUTH.getUser(),
      type: AUTH.getType(),
      files: [],
      description: "",
      items: [
        { href: "/bloggerdashboard", title: "Home", icon: "dashboard" },
        { href: "/myaccount", title: "My Account", icon: "account_circle" }
      ]
    };
  },
  methods: {
     changeColor() {
      this.changeColor = "deep-orange";
    },
    handleFileUpload() {
      try {
        this.files[0] = this.$refs.myFiles.files;
      } catch (error) {
        console.log(error);
      }
    },
    upload_post(object) {
      var upload = new FormData();
      upload.append("files", this.files);
      console.log(upload);
      this.$on("upload_post", object);
      this.posts.push(object);
      console.log("nigana ni sya!");
    },
    redirect(pathname) {
      this.$router.push({ path: pathname });
    },
    updatePosts(post) {
      console.log(post);

      this.posts.push(post);
      this.sortPosts();
    },
    sortPosts() {
      this.posts.sort((a, b) => (a.date_time < b.date_time ? 1 : -1));
    },
    logout: function() {
      AUTH.setUser(null);
      sessionStorage.clear();
      localStorage.clear();
      localStorage.removeItem("jwt");
      delete axios.defaults.headers.common["Authorization"];
      this.$router.push("/login");
    }
  },
  mounted() {
    localStorage.removeItem("id"),
      localStorage.removeItem("Name"),
      localStorage.removeItem("Username"),
      localStorage.removeItem("Email"),
      localStorage.removeItem("Password"),
      axios.get("http://localhost:3000/bloggers/getPost").then(res => {
        // console.log(res)
        this.posts = res.data.response;
        this.sortPosts();
        this.$store
          .dispatch("authorizedAsync", localStorage.getItem("jwt"))
          .then(response => {
            console.log(response);
            this.name = response.data.name;
            this.type = response.data.type;
          })
          .catch(err => {
            console.log(err);
          });
        // for(var i = 0;i<this.posts.length;i++){
        //   let pic = this.posts[i].post_image
        //   this.posts[i].post_image =require(`@/../api/uploads/${pic}`)
        // }
        console.log(this.posts);
      });
  }
};
</script>
