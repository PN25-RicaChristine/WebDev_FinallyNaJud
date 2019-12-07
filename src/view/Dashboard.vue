<template>
  <div>
    <v-row>
      <v-col cols="auto" lg="3">
        <v-list>
          <!-- sidebar -->
          <v-list-item>
            <v-img
              id="image"
              src="https://randomuser.me/api/portraits/women/85.jpg"
              height="200"
              max-width="200"
            ></v-img>
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
        <!-- Tinuod nga post ni diria -->
        <div class="uploaded_post">
          <div>
            <br>
            <br>
            <Post @upload_post="upload_post"/>
          </div>
        </div>

        <!-- Posts -->
        <!-- <div v-for="(item, index) in this.createPost" :key="index"> -->
        <Uploaded_Post :posts="this.posts"/>

        <!-- Comment Dialog here!! -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="px-2">
            <br>
            <v-text-field outlined label="Comment here..."></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="secondary" @click="dialog = false">Comment</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
#postbtn {
  float: right;
  top: -20px;
}
#fileinput {
  margin-left: 2%;
}
</style>

<script>
import Post from "components/Post.vue";
import Uploaded_Post from "components/Uploaded_Posts.vue";
import axios from 'axios'
export default {
  // name: "UploadPost",
  components: {
    Uploaded_Post,
    Post
  },
  data() {
    return {
      dialog: false,
      name:"",
      type:"",
      post: {
        files: [],
        rating: 0
      },
      items: [
        { href: "/dashboard", title: "Home", icon: "dashboard" },
        { href: "/myaccount", title: "My Account", icon: "account_circle" }
      ],
      posts: [
        {
          id: 4,
          files: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
          description:
            "Visit ten places on our planet that are undergoing the biggest changes today.",
          rating: 0
        },
        {
          id: 5,
          files: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
          description:
            "Visit ten places on our planet that are undergoing the biggest changes today.",
          rating: 0
        }
      ]
    };
  },
  mounted() {
    axios.get("http://localhost:3000/bloggers/getPost").then(res => {
      // console.log(res)
      this.posts = res.data.response;
      this.sortPosts();
      this.$store
      .dispatch("authorizedAsync", localStorage.getItem("jwt"))
      .then(response => {
          console.log(response)
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
  },
  methods: {
    redirect(pathname) {
      this.$router.push({ path: pathname });
    },
    changeColor() {
      this.changeColor = "deep-orange";
    },
    upload_post(object) {
      this.$on("upload_post", object);
      this.posts.push(object);
      console.log("yo");
    },
    logout: function() {
      sessionStorage.clear();
      localStorage.removeItem("jwt");
      delete axios.defaults.headers.common["Authorization"];
      this.$router.push("/login");
    }
  }
};
</script>
